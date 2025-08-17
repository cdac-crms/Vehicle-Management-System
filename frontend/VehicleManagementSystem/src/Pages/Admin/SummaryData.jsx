import React, { useEffect, useState } from "react";
import { getAdminSummary } from "../../services/SummaryData";

const SummaryData = () => {
  const [summary, setSummary] = useState({
    vehicles: 0,
    variants: 0,
    companies: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getAdminSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch summary data:", error);
        setSummary({ vehicles: 0, variants: 0, companies: 0 });
      }
    };
    fetchSummary();
  }, []);

  return (
    <section className="py-4 bg-light">
      <h3 className="text-center mb-4 fw-bold " style={{ color:"#102649" , letterSpacing: "1.5px" }}>
        Operational Summary
      </h3>

      <div className="row justify-content-center gx-4 gy-4">
        {[
          { label: "Companies", value: summary.companies, icon: "🏢" },
          { label: "Variants", value: summary.variants, icon: "⚙️" },
          { label: "Vehicles", value: summary.vehicles, icon: "🚗" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="col-8 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
            <div className="card shadow-sm text-center w-100" style={{ maxWidth: "200px", cursor: "default", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div className="card-body py-4">
                <div style={{ fontSize: "2.5rem", userSelect: "none" }} aria-label={`${label} icon`}>
                  {icon}
                </div>
                <h4 className="fw-bold my-2" style={{ color: "#102649", userSelect: "none" }}>{value}</h4>
                <p className="text-primary fw-semibold mb-0" style={{ userSelect: "none" }}>{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SummaryData;
