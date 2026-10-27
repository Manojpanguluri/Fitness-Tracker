import { useState } from "react";
import "./style.css";

function ProgressCard({ icon, title, value, goal, percent, color }) {
  return <div className="metric-card"><div className="metric-icon">{icon}</div><p>{title}</p><h3>{value} <small>/ {goal}</small></h3><div className="progress"><div className={color} style={{ width: percent + "%" }} /></div><p className="green-text">{percent}% complete</p></div>;
}

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("fitnessUser"));
  const [email, setEmail] = useState(localStorage.getItem("fitnessLastEmail") || "");
  const [activity, setActivity] = useState("Walking");
  const [minutes, setMinutes] = useState(30);
  const [goals, setGoals] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fitnessGoals") || "{}"); }
    catch { return {}; }
  });
  const [message, setMessage] = useState("");

  function login(event) { event.preventDefault(); localStorage.setItem("fitnessUser", email); localStorage.setItem("fitnessLastEmail", email); setUser(email); }
  function logout() { localStorage.removeItem("fitnessUser"); setUser(null); }
  function saveGoal(event) {
    event.preventDefault();
    const updatedGoals = { ...goals, [user]: [...(goals[user] || []), { activity, minutes }] };
    setGoals(updatedGoals); localStorage.setItem("fitnessGoals", JSON.stringify(updatedGoals)); setMessage(`Your ${minutes}-minute ${activity.toLowerCase()} goal is saved.`);
  }

  if (!user) return <main className="auth-page"><section className="auth-card"><div className="auth-icon">👋</div><h1>Welcome to MoveDaily</h1><p>Log in to view your fitness dashboard.</p><form onSubmit={login}><label>Email</label><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /><label>Password</label><input type="password" required /><button type="submit">Log in</button></form><small>Your password is not stored. This is a simple demo.</small></section></main>;

  const userGoals = goals[user] || [];
  return <><header className="top-bar"><strong>MoveDaily</strong><nav><a href="#dashboard">Dashboard</a><a href="#goals">Goals</a><a href="#tips">Tips</a><button className="link-button" onClick={logout}>Logout</button></nav></header><main id="dashboard" className="container"><section className="welcome"><p>OCTOBER 27, 2026</p><h1>Good morning, {user.split("@")[0]}!</h1><span>Small steps today create a stronger tomorrow.</span></section><h2>Today's progress</h2><section className="card-grid"><ProgressCard icon="👟" title="Steps" value="7,240" goal="10,000" percent={72} color="green" /><ProgressCard icon="🔥" title="Calories" value="420" goal="600 kcal" percent={70} color="orange" /><ProgressCard icon="💧" title="Water" value="5" goal="8 glasses" percent={62} color="blue" /><div className="metric-card"><div className="metric-icon">🎯</div><p>Today's goals</p><h3>{userGoals.length} saved</h3>{userGoals.map((goal, index) => <p className="saved-goal" key={index}>{goal.minutes} min {goal.activity}</p>)}</div></section><section id="goals" className="goal-section"><div><h2>Add a daily goal</h2><p>Choose one activity for today.</p><form onSubmit={saveGoal}><label>Activity</label><select value={activity} onChange={(event) => setActivity(event.target.value)}><option>Walking</option><option>Running</option><option>Cycling</option><option>Yoga</option></select><label>Target in minutes</label><input type="number" min="1" value={minutes} onChange={(event) => setMinutes(event.target.value)} /><button type="submit">Save goal</button><strong className="green-text">{message}</strong></form></div><div className="weekly-card"><h2>Weekly activity</h2><p>210 active minutes this week</p><div className="chart">{[45, 70, 55, 85, 64, 40, 78].map((height, index) => <i key={index} style={{ height: height + "%" }} />)}</div></div></section><section id="tips" className="tips"><h2>Quick wellness tips</h2><div className="tip-grid"><article>🧘<h3>Take a stretch break</h3><p>Stretch for two minutes every hour.</p></article><article>🥤<h3>Carry water</h3><p>Keep a bottle nearby to stay hydrated.</p></article><article>🌙<h3>Rest well</h3><p>A regular bedtime helps your body recover.</p></article></div></section></main><footer>© 2026 MoveDaily Fitness Tracker</footer></>;
}
