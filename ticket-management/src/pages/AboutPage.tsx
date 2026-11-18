function AboutPage() {
  return (
    <div className="about-page">
      <p className="eyebrow">ABOUT THE PROJECT</p>

      <h1>About TicketDesk</h1>

      <p>
        TicketDesk is a simple ticket management application
        built using React and TypeScript.
      </p>

      <p>
        It helps users create, organize, search, and track
        support tickets through three stages: Open,
        In Progress, and Resolved.
      </p>

      <div className="about-features">
        <h2>App Features</h2>

        <ul>
          <li>Create new support tickets.</li>
          <li>Organize tickets by status.</li>
          <li>Set ticket priority.</li>
          <li>Search tickets by subject.</li>
          <li>Move tickets between stages.</li>
          <li>Save tickets using browser localStorage.</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;