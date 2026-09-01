/**
 * TAMAplugin: TAMAKEE Studio Interactive Web App View for TheHUB
 * Implements full-screen Board Exam Simulator, Architectural Solvers & 7-Cluster Knowledge Browser.
 */
(function(){
  'use strict';

  let _activeSubTab = 'exam'; // 'exam' | 'solvers' | 'vault'
  let _examState = {
    active: false,
    mode: '100',
    currentIndex: 0,
    answers: {},
    timeRemainingSec: 7200,
    timerInterval: null,
    submitted: false,
    score: 0
  };

  // Sample High-Yield Core Question Bank for Interactive Web Simulator
  const TAMAKEE_QUESTIONS = [
    {
      id: 1, category: 'Building Laws: PD 1096 NBCP',
      question: 'Under Table VII.1 of PD 1096 (NBCP), what is the Maximum Allowable Percentage of Site Occupancy (PSO) for an Inside Lot in a C-2 zone without a firewall?',
      options: { A: '50%', B: '70%', C: '75%', D: '80%' },
      correct: 'C', citation: 'PD 1096 NBCP Table VII.1',
      trap: 'Option A is for R-1 inside lots; Option B is for R-2; Option D is for C-2 corner lots with firewall abutments.'
    },
    {
      id: 2, category: 'Building Laws: RA 9514 Fire Code',
      question: 'Under RA 9514 IRR Section 10.2.5.2, what is the statutory occupant load factor for an educational classroom?',
      options: { A: '0.65 sqm/person (net)', B: '1.40 sqm/person (net)', C: '1.80 sqm/person (net)', D: '4.60 sqm/person (net)' },
      correct: 'C', citation: 'RA 9514 IRR Sec. 10.2.5.2',
      trap: '0.65 is concentrated auditorium assembly; 1.40 is dining; 4.60 is vocational shop/laboratory.'
    },
    {
      id: 3, category: 'Building Laws: BP 344 Accessibility',
      question: 'Under BP 344 Rule II Section 2, what is the maximum allowable gradient/slope for pedestrian accessible ramps?',
      options: { A: '1:8 (12.5%)', B: '1:10 (10.0%)', C: '1:12 (8.33%)', D: '1:16 (6.25%)' },
      correct: 'C', citation: 'BP 344 Rule II Sec. 2',
      trap: '1:8 is permitted only for very short vertical rises under 50 mm.'
    },
    {
      id: 4, category: 'Building Laws: RA 9266 Architecture Act',
      question: 'Under Section 33 of RA 9266, who owns the intellectual property and copyright of architectural contract documents?',
      options: { A: 'The Client who paid for the project', B: 'The Local Building Official', C: 'The Registered and Licensed Architect (RLA)', D: 'The General Contractor' },
      correct: 'C', citation: 'RA 9266 Sec. 33',
      trap: 'The client owns only the physical paper copies; copyright remains with the architect.'
    },
    {
      id: 5, category: 'Structural Studies: Beam Moments',
      question: 'What is the maximum bending moment for a simply supported beam of span L = 6.00 m carrying a uniform load w = 20.00 kN/m?',
      options: { A: '45.00 kN·m', B: '60.00 kN·m', C: '90.00 kN·m', D: '180.00 kN·m' },
      correct: 'C', citation: 'STRUC 1 / Statics',
      trap: 'Mmax = wL²/8 = (20 x 36) / 8 = 720 / 8 = 90.00 kN·m at midspan.'
    },
    {
      id: 6, category: 'Building Utilities: Electrical PEC',
      question: 'Under the Philippine Electrical Code (PEC 2017), what is the standard nominal single-phase voltage in the Philippines?',
      options: { A: '110 V / 50 Hz', B: '120 V / 60 Hz', C: '220 V / 50 Hz', D: '230 V / 60 Hz' },
      correct: 'D', citation: 'PEC 2017 Part 1',
      trap: '230V / 60Hz is the official standard nominal voltage in the Philippines.'
    },
    {
      id: 7, category: 'Building Utilities: Acoustics',
      question: 'Using Sabine\'s metric formula (RT60 = 0.161 V / A), what is the reverberation time for a 1,000 m³ hall with total absorption A = 161 metric sabins?',
      options: { A: '0.50 seconds', B: '1.00 second', C: '1.61 seconds', D: '2.00 seconds' },
      correct: 'B', citation: 'BU 3 / Sabine Acoustics',
      trap: 'RT60 = (0.161 x 1,000) / 161 = 161 / 161 = 1.00 second.'
    },
    {
      id: 8, category: 'History of Architecture: Classical Greece',
      question: 'What optical refinement was incorporated into the stylobate platform of the Parthenon in Athens?',
      options: { A: 'Downward slope for drainage', B: 'Convex upward curvature (60mm on long sides)', C: 'Zig-zag steps', D: 'Elliptical perimeter' },
      correct: 'B', citation: 'HOA 1 / Vitruvius',
      trap: 'Upward curvature corrects the optical illusion of center sagging.'
    },
    {
      id: 9, category: 'Site Planning: Slope Suitability',
      question: 'Under Section 15 of PD 705 (Revised Forestry Code), what is the statutory slope threshold above which lands are classified as non-alienable forest reserve?',
      options: { A: '12%', B: '15%', C: '18%', D: '25%' },
      correct: 'C', citation: 'PD 705 Sec. 15',
      trap: 'Lands 18% or steeper cannot be classified as alienable or disposable.'
    },
    {
      id: 10, category: 'Design Studio: Space Programming',
      question: 'In space programming for hospital and medical facilities, what standard circulation multiplier (Cm) is typically added to Net Floor Area?',
      options: { A: '+15% to 20%', B: '+20% to 25%', C: '+25% to 30%', D: '+35% to 45%' },
      correct: 'D', citation: 'AD 5 / Space Programming',
      trap: 'Hospitals require +35% to +45% due to 2.44m stretcher corridors, airlocks, and sterile chases.'
    }
  ];

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function renderTamakeeStudio() {
    const root = document.getElementById('tamakeeStudioRoot') || document.getElementById('page-tamakee');
    if (!root) return;

    root.innerHTML = `
      <div class="tamakee-shell">
        <div class="tamakee-header">
          <div>
            <h2>🏛️ TAMAKEE Academic Architecture Studio</h2>
            <p>7-Cluster Knowledge Vault, Interactive Board Exam Simulator & Engineering Solvers</p>
          </div>
          <div class="tamakee-subtabs">
            <button class="btn sm ${(_activeSubTab === 'exam') ? 'primary' : ''}" id="tamakeeTabExam" type="button">🎯 Exam Simulator</button>
            <button class="btn sm ${(_activeSubTab === 'solvers') ? 'primary' : ''}" id="tamakeeTabSolvers" type="button">📐 Architectural Solvers</button>
            <button class="btn sm ${(_activeSubTab === 'vault') ? 'primary' : ''}" id="tamakeeTabVault" type="button">📚 7-Cluster Vault</button>
          </div>
        </div>

        <div class="tamakee-body">
          ${(_activeSubTab === 'exam') ? renderExamView() : (_activeSubTab === 'solvers') ? renderSolversView() : renderVaultView()}
        </div>
      </div>
    `;

    // Wire Subtabs
    document.getElementById('tamakeeTabExam')?.addEventListener('click', () => { _activeSubTab = 'exam'; renderTamakeeStudio(); });
    document.getElementById('tamakeeTabSolvers')?.addEventListener('click', () => { _activeSubTab = 'solvers'; renderTamakeeStudio(); });
    document.getElementById('tamakeeTabVault')?.addEventListener('click', () => { _activeSubTab = 'vault'; renderTamakeeStudio(); });

    wireExamEvents();
    wireSolverEvents();
  }

  function renderExamView() {
    if (!_examState.active && !_examState.submitted) {
      return `
        <div class="tamakee-card exam-launcher">
          <h3>🎯 Mapúa Comprehensive Exit Exam Simulator</h3>
          <p>Test your knowledge across all 7 clusters: Building Laws, Space Programming, Building Tech, Utilities, Structures, History, and Site Planning.</p>
          <div class="exam-launcher-grid">
            <div class="exam-mode-card" data-mode="10">
              <b>⚡ 10-Item Rapid Board Drill</b>
              <small>Time Limit: 10 Minutes · High-Yield Diagnostic</small>
              <button class="btn sm primary start-exam-btn" data-exam-mode="10" type="button">Start 10Q Drill</button>
            </div>
            <div class="exam-mode-card" data-mode="50">
              <b>📝 50-Item Midterm Simulation</b>
              <small>Time Limit: 60 Minutes · Departmental Standard</small>
              <button class="btn sm primary start-exam-btn" data-exam-mode="50" type="button">Start 50Q Exam</button>
            </div>
            <div class="exam-mode-card" data-mode="100">
              <b>🏛️ 100-Item Grand Master Simulation</b>
              <small>Time Limit: 120 Minutes · Full ALE Blueprint</small>
              <button class="btn sm primary start-exam-btn" data-exam-mode="100" type="button">Start 100Q Grand Simulation</button>
            </div>
          </div>
        </div>
      `;
    }

    if (_examState.submitted) {
      const total = TAMAKEE_QUESTIONS.length;
      const pct = Math.round((_examState.score / total) * 100);
      const passed = pct >= 70;
      return `
        <div class="tamakee-card exam-results-card">
          <div class="results-header">
            <h3>🎉 Examination Complete!</h3>
            <div class="results-score-badge ${passed ? 'passed' : 'failed'}">${pct}% (${_examState.score} / ${total})</div>
          </div>
          <p><strong>Status:</strong> ${passed ? '🟢 PASSED (Board Exam Ready!)' : '🔴 NEEDS REVIEW (Review Traps & Citations)'}</p>
          
          <div class="results-actions">
            <button class="btn sm primary" id="awardStudyXpBtn" type="button">⚔️ Award +${_examState.score * 20}G & +${_examState.score * 10}XP to Companion</button>
            <button class="btn sm" id="retakeExamBtn" type="button">🔄 Retake Examination</button>
          </div>

          <div class="exam-review-list">
            <h4>Detailed Socratic Question Review:</h4>
            ${TAMAKEE_QUESTIONS.map(q => {
              const userAns = _examState.answers[q.id];
              const isCorrect = userAns === q.correct;
              return `
                <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                  <div class="review-item-top">
                    <b>Q${q.id}. ${q.category}</b>
                    <span class="badge">${isCorrect ? '✅ Correct' : `❌ Selected: ${userAns || 'None'} (Correct: ${q.correct})`}</span>
                  </div>
                  <p>${q.question}</p>
                  <div class="review-trap">⚠️ <b>Trap Note:</b> ${q.trap}</div>
                  <div class="review-citation">📜 <b>Legal Citation:</b> ${q.citation}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    const q = TAMAKEE_QUESTIONS[_examState.currentIndex] || TAMAKEE_QUESTIONS[0];
    const totalQ = TAMAKEE_QUESTIONS.length;

    return `
      <div class="tamakee-card exam-active-card">
        <div class="exam-top-bar">
          <div>
            <b>Question ${_examState.currentIndex + 1} of ${totalQ}</b>
            <span class="exam-category-pill">${q.category}</span>
          </div>
          <div class="exam-timer-pill">⏱️ ${formatTime(_examState.timeRemainingSec)}</div>
        </div>

        <div class="exam-question-body">
          <p class="question-text">${q.question}</p>
          <div class="options-grid">
            ${Object.keys(q.options).map(opt => `
              <button class="option-btn ${(_examState.answers[q.id] === opt) ? 'selected' : ''}" data-choice="${opt}" type="button">
                <span class="option-tag">${opt}</span>
                <span class="option-label">${q.options[opt]}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="socratic-clue-box" id="socraticClueBox" style="display:none;">
          <small>💡 <b>Socratic Hint:</b> ${q.trap}</small>
        </div>

        <div class="exam-controls-bar">
          <button class="btn sm" id="prevQBtn" type="button" ${_examState.currentIndex === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="btn sm" id="toggleClueBtn" type="button">💡 Toggle Socratic Clue</button>
          ${_examState.currentIndex < totalQ - 1 
            ? '<button class="btn sm primary" id="nextQBtn" type="button">Next Question →</button>'
            : '<button class="btn sm primary" id="submitExamBtn" type="button">Submit Exam ✅</button>'}
        </div>

        <div class="question-nav-grid">
          ${TAMAKEE_QUESTIONS.map((item, idx) => `
            <button class="q-nav-dot ${(_examState.currentIndex === idx) ? 'active' : ''} ${_examState.answers[item.id] ? 'answered' : ''}" data-nav-q="${idx}" type="button">${idx + 1}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderSolversView() {
    return `
      <div class="tamakee-solvers-grid">
        <!-- 1. Rule 7/8 AMBF & TGFA Calculator -->
        <div class="tamakee-card solver-card">
          <h3>🏛️ PD 1096 Rule 7/8 AMBF & TGFA Sizer</h3>
          <p>Calculates building footprint and gross area density per zoning classification.</p>
          <div class="solver-form">
            <label><span>Total Lot Area (TLA in m²):</span><input id="calcTla" type="number" value="600"></label>
            <label><span>Percentage of Site Occupancy (PSO in %):</span><input id="calcPso" type="number" value="75"></label>
            <label><span>Floor Lot Area Ratio (FLAR):</span><input id="calcFlar" type="number" value="3.6"></label>
            <button class="btn sm primary" id="solveAmbfBtn" type="button">Calculate AMBF & TGFA</button>
          </div>
          <div class="solver-output" id="ambfOutput">
            <b>Allowable Max Building Footprint (AMBF):</b> 450.00 m²<br>
            <b>Max Total Gross Floor Area (TGFA):</b> 2,160.00 m²<br>
            <b>Total Open Space within Lot (TOSL):</b> 150.00 m² (25%)
          </div>
        </div>

        <!-- 2. BP 344 Accessible Ramp Sizer -->
        <div class="tamakee-card solver-card">
          <h3>♿ BP 344 1:12 Accessible Ramp Calculator</h3>
          <p>Computes required ramp run length, intermediate landings, and total footprint.</p>
          <div class="solver-form">
            <label><span>Vertical Rise (Height H in meters):</span><input id="calcRampH" type="number" step="0.1" value="1.2"></label>
            <button class="btn sm primary" id="solveRampBtn" type="button">Size Accessible Ramp</button>
          </div>
          <div class="solver-output" id="rampOutput">
            <b>Sloped Ramp Run Length (1:12):</b> 14.40 m<br>
            <b>Intermediate Landings Required:</b> 2 landings (every 6.00m)<br>
            <b>Total Straight Footprint:</b> 20.40 m (with 1.50m top/bottom landings)
          </div>
        </div>

        <!-- 3. Structural Bending Moment Sizer -->
        <div class="tamakee-card solver-card">
          <h3>🏗️ Beam Bending Moment & Section Modulus</h3>
          <p>Calculates Mmax = wL²/8 and required Section Modulus S = M / Fb.</p>
          <div class="solver-form">
            <label><span>Beam Span (L in meters):</span><input id="calcBeamL" type="number" step="0.5" value="6.0"></label>
            <label><span>Uniform Load (w in kN/m):</span><input id="calcBeamW" type="number" step="1" value="20.0"></label>
            <button class="btn sm primary" id="solveBeamBtn" type="button">Calculate Moment & S</button>
          </div>
          <div class="solver-output" id="beamOutput">
            <b>Maximum Bending Moment (Mmax):</b> 90.00 kN·m<br>
            <b>Support Reactions (RA = RB):</b> 60.00 kN<br>
            <b>Required S (for Fb = 138 MPa):</b> 652.17 x 10³ mm³
          </div>
        </div>

        <!-- 4. Sabine Acoustic RT60 Sizer -->
        <div class="tamakee-card solver-card">
          <h3>🔊 Sabine Metric RT60 Acoustics Calculator</h3>
          <p>Calculates reverberation time RT60 = 0.161 V / A.</p>
          <div class="solver-form">
            <label><span>Room Volume (V in m³):</span><input id="calcRoomV" type="number" value="1000"></label>
            <label><span>Total Absorption (A in metric sabins):</span><input id="calcRoomA" type="number" value="161"></label>
            <button class="btn sm primary" id="solveAcousticsBtn" type="button">Calculate Reverberation Time</button>
          </div>
          <div class="solver-output" id="acousticsOutput">
            <b>Reverberation Time (RT60):</b> 1.00 seconds<br>
            <b>Acoustic Rating:</b> Optimal for Speech & Lecture Rooms (0.8 - 1.2s)
          </div>
        </div>
      </div>
    `;
  }

  function renderVaultView() {
    const modules = [
      { id: 'PD-1096', title: 'PD 1096 NBCP — Canonical Rule VII & VIII Manual', cluster: 'Cluster 1: Laws', notes: 'Setbacks, AMBF, PSO, BHL, USA, TOSL, and angular volume planes.' },
      { id: 'RA-9514', title: 'RA 9514 Fire Code — Egress & Life Safety Manual', cluster: 'Cluster 1: Laws', notes: 'Occupant load factors (1.8m² classrooms), 7.6mm stairs, travel distance (46/61m).' },
      { id: 'BP-344', title: 'BP 344 — Canonical Accessibility & Ramps Manual', cluster: 'Cluster 1: Laws', notes: '1:12 ramp slopes, 6.00m runs, dual handrails 0.70/0.90m, 1.70x1.80m toilet stalls.' },
      { id: 'RA-9266', title: 'RA 9266 & SPP — Architecture Act & Fee Manual', cluster: 'Cluster 1: Laws', notes: 'Scope of practice, dry-sealing penalties, SPP 202 5-phase fees, MDPE formulas.' },
      { id: 'AD5', title: 'AD5 — Space Programming & Zoning Manual', cluster: 'Cluster 2: Design', notes: '4-tier privacy zoning, +15% to +45% multipliers, East-West solar orientation.' },
      { id: 'BT3', title: 'BT3 — Heavy Concrete, Steel & Prestressing Manual', cluster: 'Cluster 3: Tech', notes: 'Post-tensioning 20.5 MPa transfer, tendon profiles, rainscreen facades.' },
      { id: 'BU2', title: 'BU2 — Electrical Power, Lighting & FDAS Manual', cluster: 'Cluster 4: Utilities', notes: 'PEC 230V standards, 3.5mm² wire, Lumen method 500 Lux, smoke detector 9m radius.' },
      { id: 'BU3', title: 'BU3 — Central HVAC & Sabine Acoustics Manual', cluster: 'Cluster 4: Utilities', notes: 'Chilled water plants, 1 TR = 12,000 BTU/hr, Sabine RT60 metric formula.' },
      { id: 'STRUC1', title: 'STRUC1 — Statics, Shear-Moment & Truss Manual', cluster: 'Cluster 5: Structures', notes: 'wL²/8, PL/4, overhanging zero-shear x0, Pratt truss method of sections.' },
      { id: 'STRUC3', title: 'STRUC3 — Indeterminate Moment Distribution Manual', cluster: 'Cluster 5: Structures', notes: 'Hardy Cross FEM ±wL²/12, distribution factors, modified pinned stiffness 3/4 K.' },
      { id: 'HOA1', title: 'HOA1 — Prehistoric to Gothic Architecture Manual', cluster: 'Cluster 6: History', notes: 'Imhotep Step Pyramid, Greek orders, Roman concrete, Hagia Sophia pendentives, Gothic triad.' },
      { id: 'PLAN1', title: 'PLAN1 — Site Planning, Grading & Hydrology Manual', cluster: 'Cluster 7: Planning', notes: 'Slope suitability 0-18%+, PD 1067 3m easements, cut-and-fill balance, Q=CIA/360.' }
    ];

    return `
      <div class="tamakee-vault-browser">
        <div class="vault-browser-head">
          <h3>📚 The 7-Cluster Canonical Academic Reference Spine</h3>
          <p>13 Level 5 Comprehensive Course Modules aligned with Mapúa ARIDBE and PRC ALE Board Syllabus.</p>
        </div>
        <div class="vault-modules-grid">
          ${modules.map(m => `
            <div class="vault-module-card">
              <div class="module-cluster-pill">${m.cluster}</div>
              <b>${m.title}</b>
              <p>${m.notes}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function wireExamEvents() {
    // Start Exam buttons
    document.querySelectorAll('.start-exam-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _examState.active = true;
        _examState.submitted = false;
        _examState.currentIndex = 0;
        _examState.answers = {};
        _examState.score = 0;
        _examState.timeRemainingSec = 7200;
        renderTamakeeStudio();
      });
    });

    // Option selection
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = TAMAKEE_QUESTIONS[_examState.currentIndex];
        if (!q) return;
        _examState.answers[q.id] = btn.dataset.choice;
        renderTamakeeStudio();
      });
    });

    // Next / Prev / Clue
    document.getElementById('prevQBtn')?.addEventListener('click', () => {
      if (_examState.currentIndex > 0) {
        _examState.currentIndex--;
        renderTamakeeStudio();
      }
    });

    document.getElementById('nextQBtn')?.addEventListener('click', () => {
      if (_examState.currentIndex < TAMAKEE_QUESTIONS.length - 1) {
        _examState.currentIndex++;
        renderTamakeeStudio();
      }
    });

    document.getElementById('toggleClueBtn')?.addEventListener('click', () => {
      const box = document.getElementById('socraticClueBox');
      if (box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('submitExamBtn')?.addEventListener('click', () => {
      let score = 0;
      TAMAKEE_QUESTIONS.forEach(q => {
        if (_examState.answers[q.id] === q.correct) score++;
      });
      _examState.score = score;
      _examState.submitted = true;
      _examState.active = false;
      renderTamakeeStudio();
    });

    document.getElementById('retakeExamBtn')?.addEventListener('click', () => {
      _examState.submitted = false;
      _examState.active = false;
      renderTamakeeStudio();
    });

    document.getElementById('awardStudyXpBtn')?.addEventListener('click', () => {
      if (typeof window.logStudySessionActivity === 'function') {
        window.logStudySessionActivity('Mapúa ALE Comprehensive Exam', 60, `${Math.round((_examState.score / TAMAKEE_QUESTIONS.length) * 100)}%`);
      } else if (typeof toast === 'function') {
        toast('🎉 +200G & +100XP awarded to Companion Hero!', 'success');
      }
    });

    // Navigator dots
    document.querySelectorAll('.q-nav-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        _examState.currentIndex = Number(btn.dataset.navQ) || 0;
        renderTamakeeStudio();
      });
    });
  }

  function wireSolverEvents() {
    // 1. AMBF
    document.getElementById('solveAmbfBtn')?.addEventListener('click', () => {
      const tla = Number(document.getElementById('calcTla')?.value) || 600;
      const pso = Number(document.getElementById('calcPso')?.value) || 75;
      const flar = Number(document.getElementById('calcFlar')?.value) || 3.6;
      const ambf = tla * (pso / 100);
      const tgfa = tla * flar;
      const tosl = tla - ambf;
      const out = document.getElementById('ambfOutput');
      if (out) {
        out.innerHTML = `
          <b>Allowable Max Building Footprint (AMBF):</b> ${ambf.toFixed(2)} m²<br>
          <b>Max Total Gross Floor Area (TGFA):</b> ${tgfa.toFixed(2)} m²<br>
          <b>Total Open Space within Lot (TOSL):</b> ${tosl.toFixed(2)} m² (${(100 - pso)}%)
        `;
      }
    });

    // 2. Ramp
    document.getElementById('solveRampBtn')?.addEventListener('click', () => {
      const h = Number(document.getElementById('calcRampH')?.value) || 1.2;
      const run = h * 12;
      const landings = Math.max(0, Math.floor((run - 0.01) / 6.0));
      const totalFootprint = run + (landings * 1.5) + 3.0; // 3.0m for top and bottom landings
      const out = document.getElementById('rampOutput');
      if (out) {
        out.innerHTML = `
          <b>Sloped Ramp Run Length (1:12):</b> ${run.toFixed(2)} m<br>
          <b>Intermediate Landings Required:</b> ${landings} landings (every 6.00m max)<br>
          <b>Total Straight Footprint:</b> ${totalFootprint.toFixed(2)} m (with 1.50m landings)
        `;
      }
    });

    // 3. Beam
    document.getElementById('solveBeamBtn')?.addEventListener('click', () => {
      const l = Number(document.getElementById('calcBeamL')?.value) || 6.0;
      const w = Number(document.getElementById('calcBeamW')?.value) || 20.0;
      const mmax = (w * l * l) / 8;
      const ra = (w * l) / 2;
      const sReq = (mmax * 1e6) / 138; // for 138 MPa
      const out = document.getElementById('beamOutput');
      if (out) {
        out.innerHTML = `
          <b>Maximum Bending Moment (Mmax):</b> ${mmax.toFixed(2)} kN·m<br>
          <b>Support Reactions (RA = RB):</b> ${ra.toFixed(2)} kN<br>
          <b>Required S (for Fb = 138 MPa):</b> ${(sReq / 1e3).toFixed(2)} x 10³ mm³
        `;
      }
    });

    // 4. Acoustics
    document.getElementById('solveAcousticsBtn')?.addEventListener('click', () => {
      const v = Number(document.getElementById('calcRoomV')?.value) || 1000;
      const a = Number(document.getElementById('calcRoomA')?.value) || 161;
      const rt60 = (0.161 * v) / Math.max(1, a);
      const out = document.getElementById('acousticsOutput');
      if (out) {
        out.innerHTML = `
          <b>Reverberation Time (RT60):</b> ${rt60.toFixed(2)} seconds<br>
          <b>Acoustic Rating:</b> ${rt60 <= 1.2 && rt60 >= 0.8 ? 'Optimal for Lecture / Speech Rooms (0.8 - 1.2s)' : rt60 < 0.8 ? 'Dead / Recording Studio Quality' : 'Live / Music Hall Character'}
        `;
      }
    });
  }

  window.renderTamakeeStudio = renderTamakeeStudio;
})();
