const SettingsPage = () => {
  return (
    <section className="page settings-page">
      <h2>Settings</h2>
      <div className="card">
        <label>
          Sound
          <input type="range" min={0} max={100} defaultValue={70} />
        </label>
        <label>
          Language
          <select defaultValue="en">
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="es">Español</option>
          </select>
        </label>
        <label>
          Theme
          <select defaultValue="dark">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
      </div>
    </section>
  );
};

export default SettingsPage;
