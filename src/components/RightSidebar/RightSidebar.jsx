function RightSidebar() {
  return (
    <aside className="card">
      <div className="card-header">
        <h3 className="section-title">Eventos próximos</h3>
      </div>
      <div className="card-content">
        <div style={{ marginBottom: '18px' }}>
          <strong>Concierto universitario</strong>
          <p style={{ margin: '8px 0 0', color: '#5e6f8d' }}>Viernes 20:00</p>
        </div>
        <div style={{ marginBottom: '18px' }}>
          <strong>Encuentro de estudio</strong>
          <p style={{ margin: '8px 0 0', color: '#5e6f8d' }}>Sábado 14:00</p>
        </div>
      </div>

      <div className="card-header" style={{ borderTop: '1px solid var(--border)' }}>
        <h3 className="section-title">Solicitud</h3>
      </div>
      <div className="card-content">
        <div style={{ textAlign: 'center' }}>
          <img
            src="https://www.w3schools.com/w3images/avatar6.png"
            alt="Solicitud"
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <p style={{ margin: '12px 0 8px', fontWeight: 700 }}>Jane Doe</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="small-button">Aceptar</button>
            <button className="small-button">Rechazar</button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
