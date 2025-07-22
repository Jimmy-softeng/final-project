import React from "react";

function Features(){
    const features=[
        { title: "Task Management", desc: "Assign, track, and manage your team’s tasks effortlessly.", img: "/task.png" },
        { title: "Customer Insights", desc: "Understand your clients better and enhance relationships.", img: "/customer.png" },
        { title: "Sales Tracker", desc: "Monitor sales in real-time and optimize strategies.", img: "/sales.png" },
        { title: "Team Collaboration", desc: "Keep everyone aligned and productive.", img: "/team.png" },
        { title: "Automation Tools", desc: "Automate repetitive tasks and save time.", img: "/automation.png" },
        { title: "Data Exporting", desc: "Easily export reports and data for further analysis.", img: "/export.png" },
    ]
    return(
      <section className="features-section">
        <h2>Transform Your Business with BizPro’s Powerful Suite of Tools</h2>
        <div className="feature-grid">
        {features.map(({ title, desc, img }, index) => (
          <div key={index} className="feature-card">
            <img src={img} alt={title} />
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
        </div>

      </section>
    );

}
export default Features;