import { useEffect, useState } from "react";
import * as api from "../../utils/api";
import "../Routine/Routine.css";
import wash from "../../assets/hairwash.png";
import moisture from "../../assets/moisture.png";
import oil from "../../assets/hairoil.png";

const routineByPorosity = {
  low: {
    title: "Low Porosity Routine",
    description:
      "Your hair benefits from lightweight moisture and gentle heat to help products absorb.",
    wash: {
      frequency: "Every 7–10 days",
      steps: [
        "Wash with warm water",
        "Use a lightweight deep conditioner",
        "Apply heat or steam to help products absorb",
      ],
    },
    moisture: {
      frequency: "2–3x per week",
      steps: [
        "Mist hair with water or a water-based leave-in",
        "Seal with a lightweight oil",
      ],
    },
    oils: ["Jojoba", "Argan", "Grapeseed", "Sweet Almond"],
  },

  medium: {
    title: "Medium Porosity Routine",
    description:
      "Your hair retains moisture well and responds best to consistent care.",
    wash: {
      frequency: "Every 7 days",
      steps: [
        "Cleanse scalp thoroughly",
        "Deep condition to maintain moisture balance",
      ],
    },
    moisture: {
      frequency: "2x per week",
      steps: ["Apply leave-in conditioner", "Seal with oil or cream"],
    },
    oils: ["Avocado", "Olive (light)", "Argan", "Jojoba"],
  },

  high: {
    title: "High Porosity Routine",
    description:
      "Your hair needs frequent moisture and strong sealing to prevent dryness.",
    wash: {
      frequency: "Every 5–7 days",
      steps: [
        "Use a moisturizing cleanser",
        "Deep condition",
        "Seal moisture immediately after rinsing",
      ],
    },
    moisture: {
      frequency: "3–4x per week",
      steps: [
        "Apply a cream-based moisturizer",
        "Seal with heavier oil or butter",
      ],
    },
    oils: ["Castor", "Jamaican Black Castor", "Olive", "Shea Butter"],
  },
};

const routineTasks = (routine) => [
  {
    id: "wash",
    label: "Wash Day",
    frequency: routine.wash.frequency,
  },
  {
    id: "moisture",
    label: "Moisture",
    frequency: routine.moisture.frequency,
  },
  {
    id: "oil",
    label: "Seal with Oil",
    frequency: "As needed",
  },
];

function Routine({ user }) {
  const [routines, setRoutines] = useState([]);
  const [completedByDate, setCompletedByDate] = useState({});
  const [activePorosity, setActivePorosity] = useState(
    user?.porosity?.toLowerCase(),
  );

  useEffect(() => {
    const saved = localStorage.getItem("routineCompleted");
    if (saved) {
      setCompletedByDate(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("routineCompleted", JSON.stringify(completedByDate));
  }, [completedByDate]);

  useEffect(() => {
    api.getRoutines().then(setRoutines);
  }, []);

  if (!user || !user.porosity) {
    return <p>Loading Your Routine...</p>;
  }
  // const porosityKey = user.porosity.toLowerCase();
  const porosityKey = activePorosity;
  const routine = routineByPorosity[porosityKey];
  const today = new Date().toISOString().split("T")[0];

  if (!routine) {
    return <p>No routine available for your hair profile yet.</p>;
  }

  return (
    <section className="routine">
      {/* Header */}
      <header className="routine__header">
        <h1>Your Personalized Routine</h1>
        <p>{routine.description}</p>
      </header>
      {/* Hair Summary */}
      <div className="routine__profile">
        <p>
          <strong>Hair Type:</strong>
          {user.hairType}
        </p>
        <p>
          <strong>Porosity:</strong>
          {user.porosity}
        </p>

        {/* Porosity Preview Switch */}
        <div className="routine__porosity-switch">
          <label>Explore routine by porosity:</label>
          <select
            value={activePorosity}
            onChange={(e) => setActivePorosity(e.target.value)}
          >
            <option value="low">Low porosity</option>
            <option value="medium">Medium porosity</option>
            <option value="high">High porosity</option>
          </select>

          {activePorosity !== user.porosity.toLowerCase() && (
            <small className="routine__hint">
              Previewing a different porosity routine
            </small>
          )}
        </div>
      </div>

      {/* Routine Cards */}
      <div key={activePorosity} className="routine__cards routine__fade">
        <div className="routine__cards">
          <div
            className="routine__card routine__card-wash"
            style={{ backgroundImage: `url(${wash})` }}
          >
            <div className="routine__card-overlay"></div>
            <div className="routine__card-content">
              <h3>Wash Day</h3>

              <span>{routine.wash.frequency}</span>
              <ul>
                {routine.wash.steps.map((step, i) => (
                  <li key={i}> {step}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="routine__card routine__card-moist"
            style={{ backgroundImage: `url(${moisture})` }}
          >
            <div className="routine__card-overlay"></div>
            <div className="routine__card-content">
              <h3>Moisture Days</h3>
              <span>{routine.moisture.frequency}</span>
              <ul>
                {routine.moisture.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="routine__card routine__card-oil "
            style={{ backgroundImage: `url(${oil})` }}
          >
            {" "}
            <div className="routine__card-overlay"></div>
            <div className="routine__card-content">
              <h3>Recommended Oils</h3>
              <ul>
                {routine.oils.map((oil, i) => (
                  <li key={i}>{oil}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="routine__card routine__card--maintenance">
        <h3>Trims & Maintenance</h3>

        <p className="routine__maintenance-text">
          Trims help prevent split ends from traveling up the hair shaft and
          support long-term length retention.
        </p>

        <ul className="routine__maintenance-list">
          <li>
            Recommended every <strong>8–12 weeks</strong>
          </li>
          <li>Adjust timing based on your hair goals</li>
        </ul>

        <button className="routine__maintenance-btn" type="button" disabled>
          Trim tracking coming soon
        </button>
      </div>
      <section className="routine__weekly">
        <h3>Today's Hair Care Check-in</h3>

        <div className="routine__weekly-grid">
          {routineTasks(routine).map((task) => {
            const completedToday = completedByDate[today] || [];

            return (
              <div key={task.id} className="routine__weekly-column">
                <span className="routine__weekly-label">{task.label}</span>
                <small>{task.frequency}</small>
                <input
                  type="checkbox"
                  checked={completedToday.includes(task.id)}
                  onChange={() => {
                    setCompletedByDate((prev) => {
                      const current = prev[today] || [];
                      const updated = current.includes(task.id)
                        ? current.filter((t) => t !== task.id)
                        : [...current, task.id];

                      return {
                        ...prev,
                        [today]: updated,
                      };
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default Routine;
