// ===== Odoo-style CRM Logístico - Cargas del Oriente =====

document.addEventListener('DOMContentLoaded', () => {
    initMainMenu();
    initSubMenu();
    loadView('dashboard');
});

function initMainMenu() {
    document.querySelectorAll('.o-menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.o-menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const menu = item.dataset.menu;
            if (menu === 'fleet') {
                document.getElementById('subMenu').style.display = 'flex';
                loadView('vehicles');
            } else if (menu === 'config') {
                document.getElementById('subMenu').style.display = 'none';
                loadView('config');
            }
        });
    });
}

function initSubMenu() {
    document.querySelectorAll('.o-submenu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.o-submenu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            loadView(item.dataset.view);
        });
    });
}

function loadView(view) {
    const content = document.getElementById('mainContent');
    const views = { dashboard: dashboardView, vehicles: vehiclesListView, fines: finesListView, clients: clientsListView, routes: routesListView, scheduling: schedulingListView, dispatch: dispatchListView, settlement: settlementListView, config: configView };
    content.innerHTML = views[view] ? views[view]() : '';
}

// Modal
function openModal(title, body, footer) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = body;
    document.getElementById('modalFooter').innerHTML = footer || '';
    document.getElementById('modalOverlay').classList.add('active');
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('active'); }
document.getElementById('modalOverlay').addEventListener('click', (e) => { if (e.target.id === 'modalOverlay') closeModal(); });

// ===== DASHBOARD VIEW =====
function dashboardView() {
    return `
    <div class="o-dashboard">
        <h2>Panel de Flotilla</h2>
        <p class="subtitle">Indicadores críticos de la flotilla y estado operativo.</p>

        <div class="o-dashboard-section">
            <h4>Cumplimiento</h4>
            <div class="o-kpi-grid">
                <div class="o-kpi-card red">
                    <div class="o-kpi-icon red"><i class="fas fa-gavel"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">2</div>
                        <div class="o-kpi-label">Multas pendientes</div>
                        <div class="o-kpi-sublabel">Multas de tránsito abiertas</div>
                    </div>
                </div>
                <div class="o-kpi-card yellow">
                    <div class="o-kpi-icon yellow"><i class="fas fa-file-alt"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">4</div>
                        <div class="o-kpi-label">Documentos próximos a vencer</div>
                        <div class="o-kpi-sublabel">SOAT y Tecnomecánica</div>
                    </div>
                </div>
                <div class="o-kpi-card orange">
                    <div class="o-kpi-icon orange"><i class="fas fa-id-card"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">1</div>
                        <div class="o-kpi-label">Licencias por vencer</div>
                        <div class="o-kpi-sublabel">Conductores con licencia < 15 días</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="o-dashboard-section">
            <h4>Estado de la Flotilla</h4>
            <div class="o-kpi-grid">
                <div class="o-kpi-card green">
                    <div class="o-kpi-icon green"><i class="fas fa-parking"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">15</div>
                        <div class="o-kpi-label">Parqueado</div>
                        <div class="o-kpi-sublabel">Activos y disponibles</div>
                    </div>
                </div>
                <div class="o-kpi-card blue">
                    <div class="o-kpi-icon blue"><i class="fas fa-road"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">8</div>
                        <div class="o-kpi-label">En ruta</div>
                        <div class="o-kpi-sublabel">Vehículos despachados</div>
                    </div>
                </div>
                <div class="o-kpi-card orange">
                    <div class="o-kpi-icon orange"><i class="fas fa-wrench"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">3</div>
                        <div class="o-kpi-label">Mantenimiento</div>
                        <div class="o-kpi-sublabel">En taller actualmente</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="o-dashboard-section">
            <h4>Operación del día</h4>
            <div class="o-kpi-grid">
                <div class="o-kpi-card green">
                    <div class="o-kpi-icon green"><i class="fas fa-calendar-check"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">6</div>
                        <div class="o-kpi-label">Viajes programados hoy</div>
                        <div class="o-kpi-sublabel">3 despachados, 3 pendientes</div>
                    </div>
                </div>
                <div class="o-kpi-card blue">
                    <div class="o-kpi-icon blue"><i class="fas fa-users"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">18</div>
                        <div class="o-kpi-label">Conductores activos</div>
                        <div class="o-kpi-sublabel">Disponibles para asignación</div>
                    </div>
                </div>
                <div class="o-kpi-card yellow">
                    <div class="o-kpi-icon yellow"><i class="fas fa-clipboard-check"></i></div>
                    <div class="o-kpi-info">
                        <div class="o-kpi-value">5</div>
                        <div class="o-kpi-label">Liquidaciones pendientes</div>
                        <div class="o-kpi-sublabel">En revisión / por aprobar</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="o-dashboard-section">
            <h4>Alertas recientes</h4>
            <div class="o-alert-feed">
                <div class="o-alert-feed-item"><span class="o-alert-dot red"></span><div class="o-alert-text"><strong>SOAT vencido:</strong> ABC-123 â€” Kenworth T800</div><span class="o-alert-date">Venció 25/05/2026</span></div>
                <div class="o-alert-feed-item"><span class="o-alert-dot yellow"></span><div class="o-alert-text"><strong>Tecnomecánica próxima:</strong> DEF-456 â€” International 9200</div><span class="o-alert-date">Vence 05/06/2026</span></div>
                <div class="o-alert-feed-item"><span class="o-alert-dot yellow"></span><div class="o-alert-text"><strong>Licencia por vencer:</strong> Carlos López</div><span class="o-alert-date">Vence 10/06/2026</span></div>
                <div class="o-alert-feed-item"><span class="o-alert-dot red"></span><div class="o-alert-text"><strong>Multa pendiente pago:</strong> Comparendo #45678 â€” ABC-123</div><span class="o-alert-date">Límite 01/06/2026</span></div>
                <div class="o-alert-feed-item"><span class="o-alert-dot green"></span><div class="o-alert-text"><strong>Viaje finalizado:</strong> DEF-456 â€” Sonson â†’ Tocancipá</div><span class="o-alert-date">Hoy 14:30</span></div>
            </div>
        </div>
    </div>`;
}

// ===== VEHICLES LIST VIEW =====

function vehiclesListView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left">
            <span class="o-breadcrumb">Vehículos</span>
            <button class="o-btn o-btn-primary" onclick="openVehicleForm()"><i class="fas fa-plus"></i> Nuevo</button>
        </div>
        <div class="o-cp-right">
            <div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div>
            <div class="o-view-switch">
                <button class="o-btn-icon active" title="Kanban"><i class="fas fa-th-large"></i></button>
                <button class="o-btn-icon" title="Lista" onclick="loadVehiclesList()"><i class="fas fa-list"></i></button>
            </div>
            <div class="o-pager"><span>1-7 / 7</span></div>
        </div>
    </div>
    <div class="o-vehicle-kanban">
        <div class="o-kanban-column">
            <div class="o-kanban-column-header">Activo <span class="count">4</span></div>
            <div class="o-kanban-column-bar green"></div>
            <div class="o-vehicle-card" onclick="openVehicleDetail()"><div class="o-vehicle-card-header"><div class="o-vehicle-plate">ABC-123<small>V-001 Â· Kenworth T800</small></div></div><div class="o-vehicle-card-body">Tractomula C3S2 Â· 2022 Â· 185,420 km<div class="driver"><span class="driver-dot">JP</span> Juan Pérez</div></div><div class="o-vehicle-docs"><span class="o-vehicle-doc-badge expired"><span class="o-dot o-dot-red" style="width:6px;height:6px;"></span> SOAT</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> TM</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> Seguro</span></div></div>
            <div class="o-vehicle-card" onclick="openVehicleDetail()"><div class="o-vehicle-card-header"><div class="o-vehicle-plate">DEF-456<small>V-002 Â· International 9200</small></div></div><div class="o-vehicle-card-body">Tractomula C3S2 Â· 2021 Â· 210,800 km<div class="driver"><span class="driver-dot">CL</span> Carlos López</div></div><div class="o-vehicle-docs"><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> SOAT</span><span class="o-vehicle-doc-badge warn"><span class="o-dot o-dot-yellow" style="width:6px;height:6px;"></span> TM</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> Seguro</span></div></div>
            <div class="o-vehicle-card" onclick="openVehicleDetail()"><div class="o-vehicle-card-header"><div class="o-vehicle-plate">JKL-012<small>V-004 Â· Kenworth T660</small></div></div><div class="o-vehicle-card-body">Tractomula C3S2 Â· 2020 Â· 245,100 km<div class="driver"><span class="driver-dot">AR</span> Andrés Ríos</div></div><div class="o-vehicle-docs"><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> SOAT</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> TM</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> Seguro</span></div></div>
            <div class="o-vehicle-card" onclick="openVehicleDetail()"><div class="o-vehicle-card-header"><div class="o-vehicle-plate">MNO-345<small>V-005 Â· Hino 500</small></div></div><div class="o-vehicle-card-body">Dobletroque C3 Â· 2023 Â· 45,200 km<div class="driver"><span class="driver-dot">LG</span> Luis Gómez</div></div><div class="o-vehicle-docs"><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> SOAT</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> TM</span></div></div>
        </div>
        <div class="o-kanban-column">
            <div class="o-kanban-column-header">En ruta <span class="count">2</span></div>
            <div class="o-kanban-column-bar blue"></div>
            <div class="o-vehicle-card" onclick="openVehicleDetail()"><div class="o-vehicle-card-header"><div class="o-vehicle-plate">PQR-678<small>V-006 Â· Freightliner Cascadia</small></div></div><div class="o-vehicle-card-body">Tractomula C3S3 Â· 2022<br>Ruta: Marinilla â†’ Bogotá<div class="driver"><span class="driver-dot">MT</span> Miguel Torres</div></div><div class="o-vehicle-docs"><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> SOAT</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> TM</span></div></div>
            <div class="o-vehicle-card" onclick="openVehicleDetail()"><div class="o-vehicle-card-header"><div class="o-vehicle-plate">STU-901<small>V-007 Â· Chevrolet NQR</small></div></div><div class="o-vehicle-card-body">Turbo C2 Â· 2024<br>Ruta: Guarne â†’ Rionegro<div class="driver"><span class="driver-dot">DP</span> Diego Parra</div></div><div class="o-vehicle-docs"><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> SOAT</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> TM</span></div></div>
        </div>
        <div class="o-kanban-column">
            <div class="o-kanban-column-header">Mantenimiento <span class="count">1</span></div>
            <div class="o-kanban-column-bar orange"></div>
            <div class="o-vehicle-card" onclick="openVehicleDetail()"><div class="o-vehicle-card-header"><div class="o-vehicle-plate">GHI-789<small>V-003 Â· Chevrolet NHR</small></div></div><div class="o-vehicle-card-body">Turbo C2 Â· 2023<br>Cambio frenos + revisión general<div class="driver"><span class="driver-dot">â€”</span> Sin asignar</div></div><div class="o-vehicle-docs"><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> SOAT</span><span class="o-vehicle-doc-badge ok"><span class="o-dot o-dot-green" style="width:6px;height:6px;"></span> TM</span></div></div>
        </div>
        <div class="o-kanban-column">
            <div class="o-kanban-column-header">Fuera de servicio <span class="count">0</span></div>
            <div class="o-kanban-column-bar red"></div>
            <p style="text-align:center;color:var(--o-text-light);font-size:12px;padding:20px;">Sin Vehículos</p>
        </div>
    </div>`;
}

function loadVehiclesList() {
    document.getElementById('mainContent').innerHTML = `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb">Vehículos</span><button class="o-btn o-btn-primary" onclick="openVehicleForm()"><i class="fas fa-plus"></i> Nuevo</button></div>
        <div class="o-cp-right"><div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div><div class="o-view-switch"><button class="o-btn-icon" onclick="loadView('vehicles')"><i class="fas fa-th-large"></i></button><button class="o-btn-icon active"><i class="fas fa-list"></i></button></div><div class="o-pager"><span>1-7 / 7</span></div></div>
    </div>
    <div class="o-list-view">
        <table>
            <thead><tr><th style="width:30px;"><input type="checkbox" class="o-checkbox"></th><th>Placa</th><th>Int.</th><th>Marca / Línea</th><th>Año</th><th>Tipo</th><th>Conductor</th><th>KM</th><th>SOAT</th><th>TM</th><th>Seguro</th><th>Estado</th></tr></thead>
            <tbody>
                <tr onclick="openVehicleDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>ABC-123</strong></td><td>V-001</td><td>Kenworth T800</td><td>2022</td><td>Tractomula</td><td>Juan Pérez</td><td>185,420</td><td><span class="o-dot o-dot-red"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-badge-status o-badge-success">Activo</span></td></tr>
                <tr onclick="openVehicleDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>DEF-456</strong></td><td>V-002</td><td>International 9200</td><td>2021</td><td>Tractomula</td><td>Carlos López</td><td>210,800</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-yellow"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-badge-status o-badge-success">Activo</span></td></tr>
                <tr onclick="openVehicleDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>GHI-789</strong></td><td>V-003</td><td>Chevrolet NHR</td><td>2023</td><td>Turbo</td><td>â€”</td><td>78,300</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-badge-status o-badge-warning">Mtto.</span></td></tr>
                <tr onclick="openVehicleDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>JKL-012</strong></td><td>V-004</td><td>Kenworth T660</td><td>2020</td><td>Tractomula</td><td>Andrés Ríos</td><td>245,100</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-badge-status o-badge-success">Activo</span></td></tr>
                <tr onclick="openVehicleDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>PQR-678</strong></td><td>V-006</td><td>Freightliner Cascadia</td><td>2022</td><td>Tractomula</td><td>Miguel Torres</td><td>165,000</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-badge-status o-badge-info">En ruta</span></td></tr>
            </tbody>
        </table>
    </div>`;
}


function openVehicleForm() {
    openModal('Nuevo Vehículo', `
        <div class="o-form-view">
            <div class="o-group">
                <div><div class="o-field-row"><span class="o-field-label">Placa Tránsito</span><span class="o-field-value"><input placeholder="ABC-123"></span></div>
                <div class="o-field-row"><span class="o-field-label">Placa Interna</span><span class="o-field-value"><input placeholder="V-001"></span></div>
                <div class="o-field-row"><span class="o-field-label">Marca</span><span class="o-field-value"><select><option>Seleccionar...</option><optgroup label="Carga Pesada"><option>Kenworth</option><option>International</option><option>Freightliner</option><option>Mack</option><option>Volvo</option><option>Scania</option><option>Mercedes-Benz</option><option>DAF</option><option>MAN</option></optgroup><optgroup label="Carga Media / Turbo"><option>Chevrolet</option><option>Hino</option><option>JAC</option><option>Foton</option><option>JMC</option><option>Hyundai</option><option>Mitsubishi Fuso</option><option>Dongfeng</option></optgroup><optgroup label="Carga Liviana"><option>Toyota</option><option>Nissan</option><option>Ford</option><option>Kia</option></optgroup></select></span></div>
                <div class="o-field-row"><span class="o-field-label">Línea</span><span class="o-field-value"><input placeholder="T800"></span></div>
                <div class="o-field-row"><span class="o-field-label">Modelo (Año)</span><span class="o-field-value"><input type="number" placeholder="2024"></span></div>
                <div class="o-field-row"><span class="o-field-label">Color</span><span class="o-field-value"><input placeholder="Blanco"></span></div>
                <div class="o-field-row"><span class="o-field-label">Tipo Carrocería</span><span class="o-field-value"><select><option>Seleccionar...</option><option>Estacas</option><option>Furgón</option><option>Planchón / Plataforma</option><option>Volqueta (Basculante)</option><option>Cisterna / Tanque</option><option>Tauliner (Cortinero)</option><option>Refrigerado</option><option>Cama Baja</option><option>Contenedor</option></select></span></div></div>
                <div><div class="o-field-row"><span class="o-field-label">Tipo Vehículo</span><span class="o-field-value"><select><option>Seleccionar...</option><option>Turbo (C2 liviano - hasta 8 ton)</option><option>Camión Sencillo C2 (2 ejes - 17 ton)</option><option>Dobletroque C3 (3 ejes - 28 ton)</option><option>Minimula C2S1 (3 ejes - 27 ton)</option><option>Tractomula C3S2 (5 ejes - 40.5 ton)</option><option>Tractomula C3S3 (6 ejes - 48 ton)</option><option>Camioneta / Furgoneta (hasta 3.5 ton)</option></select></span></div>
                <div class="o-field-row"><span class="o-field-label">Cilindraje (cmÂ³)</span><span class="o-field-value"><input type="number" placeholder="15000"></span></div>
                <div class="o-field-row"><span class="o-field-label">Nro. Motor</span><span class="o-field-value"><input placeholder="ABC123456"></span></div>
                <div class="o-field-row"><span class="o-field-label">Nro. Chasis</span><span class="o-field-value"><input placeholder="XYZ789012"></span></div>
                <div class="o-field-row"><span class="o-field-label">VIN</span><span class="o-field-value"><input placeholder="1HGBH41JXMN109186"></span></div>
                <div class="o-field-row"><span class="o-field-label">Financiación</span><span class="o-field-value"><select><option>Leasing</option><option>Recursos Propios</option><option>Permuta</option></select></span></div>
                <div class="o-field-row"><span class="o-field-label">Estado</span><span class="o-field-value"><select><option>Activo</option><option>Inactivo</option><option>En Mantenimiento</option></select></span></div></div>
            </div>
        </div>
    `, `<button class="o-btn o-btn-secondary" onclick="closeModal()">Descartar</button><button class="o-btn o-btn-primary" onclick="closeModal()">Guardar</button>`);
}

function openVehicleDetail() {
    document.getElementById('mainContent').innerHTML = vehicleFormView();
}

function vehicleFormView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left">
            <span class="o-breadcrumb">
                <span class="parent" onclick="loadView('vehicles')">Vehículos</span>
                <span class="separator">/</span>
                ABC-123
            </span>
        </div>
        <div class="o-cp-right">
            <button class="o-btn o-btn-secondary"><i class="fas fa-edit"></i> Editar</button>
            <div class="o-pager"><button><i class="fas fa-chevron-left"></i></button><span>1 / 4</span><button><i class="fas fa-chevron-right"></i></button></div>
        </div>
    </div>
    <div class="o-form-view">
        <div class="o-form-statusbar">
            <div class="o-statusbar-buttons">
                <button class="o-btn o-btn-primary">Programar Mantenimiento</button>
            </div>
            <div class="o-statusbar-status">
                <span class="o-status-pill done">Activo</span>
                <span class="o-status-pill">En Mantenimiento</span>
                <span class="o-status-pill">Fuera de Servicio</span>
                <span class="o-status-pill">Retirado</span>
            </div>
        </div>
        <div class="o-form-sheet">
            <div class="o-group">
                <div>
                    <div class="o-field-row"><span class="o-field-label">Placa Tránsito</span><span class="o-field-value"><input value="ABC-123" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Placa Interna</span><span class="o-field-value"><input value="V-001" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Marca / Línea</span><span class="o-field-value"><input value="Kenworth T800" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Modelo</span><span class="o-field-value"><input value="2022" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Color</span><span class="o-field-value"><input value="Blanco" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Tipo Carrocería</span><span class="o-field-value"><input value="Plataforma" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Tipo Vehículo</span><span class="o-field-value"><input value="Tractomula" readonly></span></div>
                </div>
                <div>
                    <div class="o-field-row"><span class="o-field-label">VIN</span><span class="o-field-value"><input value="1HGBH41JXMN109186" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Nro. Motor</span><span class="o-field-value"><input value="ISX15-2022-78456" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Nro. Chasis</span><span class="o-field-value"><input value="KW-T800-2022-1234" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Conductor</span><span class="o-field-value" style="color:var(--o-brand);font-weight:500;">Juan Pérez</span></div>
                    <div class="o-field-row"><span class="o-field-label">Kilometraje</span><span class="o-field-value"><input value="185,420 km" readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Empresa</span><span class="o-field-value"><input value="Cargas del Oriente S.A." readonly></span></div>
                    <div class="o-field-row"><span class="o-field-label">Financiación</span><span class="o-field-value"><input value="Leasing" readonly></span></div>
                </div>
            </div>
            <div class="o-notebook">
                <div class="o-notebook-tabs">
                    <span class="o-notebook-tab active">Documentos</span>
                    <span class="o-notebook-tab">Datos Técnicos</span>
                    <span class="o-notebook-tab">Propiedad</span>
                    <span class="o-notebook-tab">Mantenimiento</span>
                    <span class="o-notebook-tab">Multas</span>
                    <span class="o-notebook-tab">Costos</span>
                </div>
                <div class="o-notebook-content">
                    <div class="o-inline-list">
                        <table>
                            <thead><tr><th>Documento</th><th>Número</th><th>Aseguradora</th><th>Expedición</th><th>Vencimiento</th><th>Estado</th></tr></thead>
                            <tbody>
                                <tr><td>SOAT</td><td>POL-2024-5678</td><td>Seguros Bolívar</td><td>25/05/2025</td><td>25/05/2026</td><td><span class="o-badge-status o-badge-danger">Vencido</span></td></tr>
                                <tr><td>Tecnomecánica</td><td>TM-2024-1234</td><td>â€”</td><td>15/12/2025</td><td>15/12/2026</td><td><span class="o-badge-status o-badge-success">Vigente</span></td></tr>
                                <tr><td>Seguro Contractual</td><td>SC-2024-9012</td><td>Sura</td><td>01/01/2026</td><td>30/09/2026</td><td><span class="o-badge-status o-badge-success">Vigente</span></td></tr>
                                <tr><td>Tarjeta de Propiedad</td><td>TP-ANT-45678</td><td>â€”</td><td>10/03/2022</td><td>N/A</td><td><span class="o-badge-status o-badge-success">Vigente</span></td></tr>
                            </tbody>
                        </table>
                        <div class="o-add-line"><i class="fas fa-plus"></i> Agregar documento</div>
                    </div>
                </div>
            </div>
            <div class="o-chatter">
                <div class="o-chatter-title">Historial</div>
                <div class="o-log-item"><div class="o-log-avatar">CA</div><div class="o-log-content"><strong>Cristina A.</strong> actualizó el kilometraje: 184,200 â†’ 185,420<br><span class="o-log-date">Hace 2 días</span></div></div>
                <div class="o-log-item"><div class="o-log-avatar">AT</div><div class="o-log-content"><strong>Andrés T.</strong> creó el registro del Vehículo<br><span class="o-log-date">15/01/2026</span></div></div>
            </div>
        </div>
    </div>`;
}

// ===== FINES LIST VIEW =====
function finesListView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left">
            <span class="o-breadcrumb">Multas de Tránsito</span>
            <button class="o-btn o-btn-primary" onclick="openFineForm()"><i class="fas fa-plus"></i> Nuevo</button>
        </div>
        <div class="o-cp-right">
            <div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div>
            <div class="o-pager"><span>1-3 / 3</span></div>
        </div>
    </div>
    <div class="o-list-view">
        <table>
            <thead><tr><th style="width:30px;"><input type="checkbox" class="o-checkbox"></th><th>Comparendo</th><th>Fecha</th><th>Vehículo</th><th>Conductor</th><th>Tipo Infracción</th><th>Valor</th><th>Vencimiento</th><th>Responsable</th><th>Estado</th></tr></thead>
            <tbody>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td><strong>#45678</strong></td><td>15/04/2026</td><td>ABC-123</td><td>Juan Pérez</td><td>Exceso velocidad</td><td>$850,000</td><td>01/06/2026</td><td>Empresa</td><td><span class="o-badge-status o-badge-danger">Vencida</span></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td><strong>#45901</strong></td><td>20/05/2026</td><td>DEF-456</td><td>Carlos López</td><td>Pico y placa</td><td>$438,000</td><td>20/07/2026</td><td>Conductor</td><td><span class="o-badge-status o-badge-warning">Pendiente</span></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td><strong>#44123</strong></td><td>10/03/2026</td><td>GHI-789</td><td>Miguel Torres</td><td>Documentación</td><td>$220,000</td><td>10/05/2026</td><td>Empresa</td><td><span class="o-badge-status o-badge-success">Pagada</span></td></tr>
            </tbody>
        </table>
    </div>`;
}

function openFineForm() {
    openModal('Nueva Multa', `
        <div class="o-form-view">
            <div class="o-group">
                <div>
                    <div class="o-field-row"><span class="o-field-label">Nro. Comparendo</span><span class="o-field-value"><input placeholder="#00000"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Fecha Infracción</span><span class="o-field-value"><input type="date"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Vehículo</span><span class="o-field-value"><select><option>Seleccionar...</option><option>ABC-123</option><option>DEF-456</option><option>GHI-789</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Conductor</span><span class="o-field-value"><select><option>Seleccionar...</option><option>Juan Pérez</option><option>Carlos López</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Valor Multa</span><span class="o-field-value"><input type="number" placeholder="$0"></span></div>
                </div>
                <div>
                    <div class="o-field-row"><span class="o-field-label">Tipo Infracción</span><span class="o-field-value"><select><option>Exceso de velocidad</option><option>Pico y placa</option><option>Documentación</option><option>Otros</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Gravedad</span><span class="o-field-value"><select><option>Leve</option><option>Grave</option><option>Gravísima</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Ciudad / Autoridad</span><span class="o-field-value"><input placeholder="Medellín - SIMM"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Fecha Límite Pago</span><span class="o-field-value"><input type="date"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Responsable Pago</span><span class="o-field-value"><select><option>Empresa</option><option>Conductor</option></select></span></div>
                </div>
            </div>
        </div>
    `, `<button class="o-btn o-btn-secondary" onclick="closeModal()">Descartar</button><button class="o-btn o-btn-primary" onclick="closeModal()">Guardar</button>`);
}

// ===== CLIENTS LIST VIEW =====
function clientsListView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left">
            <span class="o-breadcrumb">Clientes</span>
            <button class="o-btn o-btn-primary" onclick="openClientForm()"><i class="fas fa-plus"></i> Nuevo</button>
        </div>
        <div class="o-cp-right">
            <div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div>
            <div class="o-view-switch">
                <button class="o-btn-icon active"><i class="fas fa-list"></i></button>
                <button class="o-btn-icon" onclick="loadClientKanban()"><i class="fas fa-th-large"></i></button>
            </div>
            <div class="o-pager"><span>1-3 / 3</span></div>
        </div>
    </div>
    <div class="o-list-view">
        <table>
            <thead><tr><th style="width:30px;"><input type="checkbox" class="o-checkbox"></th><th>NIT</th><th>Razón Social</th><th>Contacto</th><th>Ciudad</th><th>Condición Pago</th><th>Rutas</th><th>Estado</th></tr></thead>
            <tbody>
                <tr onclick="openClientDetail()"><td><input type="checkbox" class="o-checkbox"></td><td>900.123.456-7</td><td><strong>ISAGEN S.A. E.S.P.</strong></td><td>María García</td><td>Medellín</td><td>30 días</td><td>3</td><td><span class="o-badge-status o-badge-success">Activo</span></td></tr>
                <tr onclick="openClientDetail()"><td><input type="checkbox" class="o-checkbox"></td><td>800.456.789-1</td><td><strong>Peldar S.A.</strong></td><td>Pedro Martínez</td><td>Envigado</td><td>45 días</td><td>2</td><td><span class="o-badge-status o-badge-success">Activo</span></td></tr>
                <tr onclick="openClientDetail()"><td><input type="checkbox" class="o-checkbox"></td><td>901.234.567-8</td><td><strong>Sika Colombia S.A.S.</strong></td><td>Laura Sánchez</td><td>Tocancipá</td><td>30 días</td><td>1</td><td><span class="o-badge-status o-badge-info">Prospecto</span></td></tr>
            </tbody>
        </table>
    </div>`;
}

function loadClientKanban() {
    document.getElementById('mainContent').innerHTML = `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb">Clientes</span><button class="o-btn o-btn-primary"><i class="fas fa-plus"></i> Nuevo</button></div>
        <div class="o-cp-right">
            <div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div>
            <div class="o-view-switch"><button class="o-btn-icon" onclick="loadView('clients')"><i class="fas fa-list"></i></button><button class="o-btn-icon active"><i class="fas fa-th-large"></i></button></div>
        </div>
    </div>
    <div class="o-kanban-view">
        <div class="o-kanban-card" onclick="openClientDetail()"><div class="o-kanban-card-header"><span class="o-kanban-card-title">ISAGEN S.A. E.S.P.</span><span class="o-badge-status o-badge-success">Activo</span></div><div class="o-kanban-card-body">NIT: 900.123.456-7<br>Medellín, Antioquia<br>Contacto: María García<br>3 rutas contratadas</div></div>
        <div class="o-kanban-card" onclick="openClientDetail()"><div class="o-kanban-card-header"><span class="o-kanban-card-title">Peldar S.A.</span><span class="o-badge-status o-badge-success">Activo</span></div><div class="o-kanban-card-body">NIT: 800.456.789-1<br>Envigado, Antioquia<br>Contacto: Pedro Martínez<br>2 rutas contratadas</div></div>
        <div class="o-kanban-card" onclick="openClientDetail()"><div class="o-kanban-card-header"><span class="o-kanban-card-title">Sika Colombia S.A.S.</span><span class="o-badge-status o-badge-info">Prospecto</span></div><div class="o-kanban-card-body">NIT: 901.234.567-8<br>Tocancipá, Cundinamarca<br>Contacto: Laura Sánchez<br>1 ruta contratada</div></div>
    </div>`;
}

function openClientForm() {
    const deptoOptions = Object.keys(DEPARTAMENTOS_MUNICIPIOS).map(d => `<option value="${d}">${d}</option>`).join('');
    openModal('Nuevo Cliente', `
        <div class="o-form-view">
            <div class="o-group">
                <div>
                    <div class="o-field-row"><span class="o-field-label">Tipo Persona</span><span class="o-field-value"><select><option>Persona Jurídica</option><option>Persona Natural</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">NIT</span><span class="o-field-value"><input placeholder="900.123.456"></span></div>
                    <div class="o-field-row"><span class="o-field-label">DV</span><span class="o-field-value"><input placeholder="7" style="width:50px;"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Razón Social</span><span class="o-field-value"><input placeholder="Empresa S.A.S."></span></div>
                    <div class="o-field-row"><span class="o-field-label">Dirección</span><span class="o-field-value"><input placeholder="Calle 10 #20-30"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Departamento</span><span class="o-field-value"><select id="deptoSelect" onchange="updateCiudades()"><option value="">Seleccionar...</option>${deptoOptions}</select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Ciudad / Municipio</span><span class="o-field-value"><select id="ciudadSelect"><option value="">Primero seleccione departamento</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">País</span><span class="o-field-value"><select><option>Colombia</option></select></span></div>
                </div>
                <div>
                    <div class="o-field-row"><span class="o-field-label">Contacto</span><span class="o-field-value"><input placeholder="Nombre completo"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Cargo</span><span class="o-field-value"><input placeholder="Gerente Logística"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Teléfono</span><span class="o-field-value"><input placeholder="(4) 123 4567"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Celular</span><span class="o-field-value"><input placeholder="300 123 4567"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Correo</span><span class="o-field-value"><input type="email" placeholder="contacto@empresa.com"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Condición Pago</span><span class="o-field-value"><select><option>30 días</option><option>45 días</option><option>60 días</option><option>Contado</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Latitud</span><span class="o-field-value"><input placeholder="6.2442"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Longitud</span><span class="o-field-value"><input placeholder="-75.5812"></span></div>
                </div>
            </div>
        </div>
    `, `<button class="o-btn o-btn-secondary" onclick="closeModal()">Descartar</button><button class="o-btn o-btn-primary" onclick="closeModal()">Guardar</button>`);
}

function updateCiudades() {
    const depto = document.getElementById('deptoSelect').value;
    const ciudadSelect = document.getElementById('ciudadSelect');
    ciudadSelect.innerHTML = '<option value="">Seleccionar...</option>';
    if (depto && DEPARTAMENTOS_MUNICIPIOS[depto]) {
        DEPARTAMENTOS_MUNICIPIOS[depto].forEach(ciudad => {
            ciudadSelect.innerHTML += `<option value="${ciudad}">${ciudad}</option>`;
        });
    }
}

function openClientDetail() {
    document.getElementById('mainContent').innerHTML = clientFormView();
}

function clientFormView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb"><span class="parent" onclick="loadView('clients')">Clientes</span><span class="separator">/</span>ISAGEN S.A. E.S.P.</span></div>
        <div class="o-cp-right"><button class="o-btn o-btn-secondary"><i class="fas fa-edit"></i> Editar</button></div>
    </div>
    <div class="o-form-view">
        <div class="o-form-statusbar">
            <div class="o-statusbar-buttons"><button class="o-btn o-btn-primary">Activar Cliente</button></div>
            <div class="o-statusbar-status">
                <span class="o-status-pill">Prospecto</span>
                <span class="o-status-pill done">Activo</span>
                <span class="o-status-pill">Suspendido</span>
                <span class="o-status-pill">Inactivo</span>
            </div>
        </div>
        <div class="o-group">
            <div>
                <div class="o-field-row"><span class="o-field-label">NIT</span><span class="o-field-value">900.123.456-7</span></div>
                <div class="o-field-row"><span class="o-field-label">Razón Social</span><span class="o-field-value"><strong>ISAGEN S.A. E.S.P.</strong></span></div>
                <div class="o-field-row"><span class="o-field-label">Dirección</span><span class="o-field-value">Cra 48 #26-85, Medellín</span></div>
                <div class="o-field-row"><span class="o-field-label">Ciudad</span><span class="o-field-value">Medellín, Antioquia</span></div>
                <div class="o-field-row"><span class="o-field-label">Coordenadas</span><span class="o-field-value">6.2442, -75.5812</span></div>
            </div>
            <div>
                <div class="o-field-row"><span class="o-field-label">Contacto</span><span class="o-field-value">María García</span></div>
                <div class="o-field-row"><span class="o-field-label">Cargo</span><span class="o-field-value">Gerente Logística</span></div>
                <div class="o-field-row"><span class="o-field-label">Celular</span><span class="o-field-value">310 456 7890</span></div>
                <div class="o-field-row"><span class="o-field-label">Correo</span><span class="o-field-value" style="color:var(--o-brand);">maria@isagen.com</span></div>
                <div class="o-field-row"><span class="o-field-label">Condición Pago</span><span class="o-field-value">30 días</span></div>
            </div>
        </div>
        <div class="o-notebook">
            <div class="o-notebook-tabs">
                <span class="o-notebook-tab active">Rutas</span>
                <span class="o-notebook-tab">Legal</span>
                <span class="o-notebook-tab">Gestión Cliente</span>
                <span class="o-notebook-tab">Seguridad</span>
                <span class="o-notebook-tab">Cotizaciones</span>
                <span class="o-notebook-tab">Fichas Técnicas</span>
            </div>
            <div class="o-notebook-content">
                <div class="o-inline-list">
                    <table>
                        <thead><tr><th>Ruta</th><th>Producto</th><th>Tipo Vehículo</th><th>Tarifa Vigente</th><th>Tipo Cobro</th></tr></thead>
                        <tbody>
                            <tr><td>Guarne â†’ Rionegro-Tanque</td><td>Carga seca</td><td>Tractomula</td><td>$2,850,000</td><td>Por viaje</td></tr>
                            <tr><td>Sonson â†’ Tocancipá</td><td>Químicos</td><td>Cisterna</td><td>$4,200,000</td><td>Por viaje</td></tr>
                            <tr><td>Marinilla â†’ Bogotá</td><td>Carga seca</td><td>Tractomula</td><td>$3,500,000</td><td>Por viaje</td></tr>
                        </tbody>
                    </table>
                    <div class="o-add-line"><i class="fas fa-plus"></i> Agregar ruta</div>
                </div>
            </div>
        </div>
    </div>`;
}

// ===== ROUTES LIST VIEW =====
function routesListView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb">Rutas Logísticas</span><button class="o-btn o-btn-primary" onclick="openRouteForm()"><i class="fas fa-plus"></i> Nuevo</button></div>
        <div class="o-cp-right"><div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div><div class="o-pager"><span>1-4 / 4</span></div></div>
    </div>
    <div class="o-list-view">
        <table>
            <thead><tr><th style="width:30px;"><input type="checkbox" class="o-checkbox"></th><th>Código</th><th>Origen</th><th>Destino</th><th>Cliente</th><th>Producto</th><th>Flete Vigente</th><th>Tipo Cobro</th><th>Distancia</th><th>Estado</th></tr></thead>
            <tbody>
                <tr onclick="openRouteDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>R-001</strong></td><td>Guarne</td><td>Rionegro-Tanque</td><td>ISAGEN</td><td>Carga seca</td><td>$2,850,000</td><td>Por viaje</td><td>45 km</td><td><span class="o-badge-status o-badge-success">Activa</span></td></tr>
                <tr onclick="openRouteDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>R-002</strong></td><td>Sonson</td><td>Tocancipá</td><td>ISAGEN</td><td>Químicos</td><td>$4,200,000</td><td>Por viaje</td><td>320 km</td><td><span class="o-badge-status o-badge-success">Activa</span></td></tr>
                <tr onclick="openRouteDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>R-003</strong></td><td>Marinilla</td><td>Bogotá</td><td>Peldar</td><td>Vidrio</td><td>$85,000</td><td>Por tonelada</td><td>410 km</td><td><span class="o-badge-status o-badge-success">Activa</span></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td><strong>R-004</strong></td><td>Rionegro</td><td>Medellín</td><td>Sika</td><td>Químicos</td><td>$1,200,000</td><td>Por viaje</td><td>35 km</td><td><span class="o-badge-status o-badge-secondary">Inactiva</span></td></tr>
            </tbody>
        </table>
    </div>`;
}

function openRouteForm() {
    openModal('Nueva Ruta', `
        <div class="o-form-view">
            <div class="o-group">
                <div>
                    <div class="o-field-row"><span class="o-field-label">Código Ruta</span><span class="o-field-value"><input placeholder="R-005"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Nombre</span><span class="o-field-value"><input placeholder="Guarne - Rionegro"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Cliente</span><span class="o-field-value"><select><option>Seleccionar...</option><option>ISAGEN</option><option>Peldar</option><option>Sika</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Producto</span><span class="o-field-value"><select><option>Seleccionar...</option><option>Carga seca</option><option>Químicos</option><option>Alimentos</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Distancia (km)</span><span class="o-field-value"><input type="number" placeholder="120"></span></div>
                </div>
                <div>
                    <div class="o-field-row"><span class="o-field-label">Origen - Ciudad</span><span class="o-field-value"><input placeholder="Guarne"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Origen - Depto</span><span class="o-field-value"><select><option>Antioquia</option><option>Cundinamarca</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Destino - Ciudad</span><span class="o-field-value"><input placeholder="Rionegro"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Destino - Depto</span><span class="o-field-value"><select><option>Antioquia</option><option>Cundinamarca</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Estado</span><span class="o-field-value"><select><option>Activa</option><option>Inactiva</option></select></span></div>
                </div>
            </div>
        </div>
    `, `<button class="o-btn o-btn-secondary" onclick="closeModal()">Descartar</button><button class="o-btn o-btn-primary" onclick="closeModal()">Guardar</button>`);
}

function openRouteDetail() {
    document.getElementById('mainContent').innerHTML = routeFormView();
}

function routeFormView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb"><span class="parent" onclick="loadView('routes')">Rutas</span><span class="separator">/</span>R-001: Guarne â†’ Rionegro-Tanque</span></div>
        <div class="o-cp-right"><button class="o-btn o-btn-secondary"><i class="fas fa-edit"></i> Editar</button></div>
    </div>
    <div class="o-form-view">
        <div class="o-form-statusbar">
            <div class="o-statusbar-buttons"></div>
            <div class="o-statusbar-status"><span class="o-status-pill done">Activa</span><span class="o-status-pill">Inactiva</span><span class="o-status-pill">Suspendida</span></div>
        </div>
        <div class="o-group">
            <div>
                <div class="o-field-row"><span class="o-field-label">Código</span><span class="o-field-value">R-001</span></div>
                <div class="o-field-row"><span class="o-field-label">Cliente</span><span class="o-field-value" style="color:var(--o-brand);font-weight:500;">ISAGEN S.A. E.S.P.</span></div>
                <div class="o-field-row"><span class="o-field-label">Producto</span><span class="o-field-value">Carga seca</span></div>
                <div class="o-field-row"><span class="o-field-label">Distancia</span><span class="o-field-value">45 km</span></div>
            </div>
            <div>
                <div class="o-field-row"><span class="o-field-label">Origen</span><span class="o-field-value">Guarne, Antioquia</span></div>
                <div class="o-field-row"><span class="o-field-label">Destino</span><span class="o-field-value">Rionegro-Tanque, Antioquia</span></div>
                <div class="o-field-row"><span class="o-field-label">Empresa</span><span class="o-field-value">Cargas del Oriente S.A.</span></div>
            </div>
        </div>
        <div class="o-notebook">
            <div class="o-notebook-tabs">
                <span class="o-notebook-tab active">Tarifas / Vigencias</span>
                <span class="o-notebook-tab">Peajes</span>
                <span class="o-notebook-tab">Combustible</span>
                <span class="o-notebook-tab">Vehículos Permitidos</span>
            </div>
            <div class="o-notebook-content">
                <div class="o-inline-list">
                    <table>
                        <thead><tr><th>Concepto</th><th>Valor</th><th>Tipo Cobro</th><th>Inicio Vigencia</th><th>Fin Vigencia</th><th>Estado</th></tr></thead>
                        <tbody>
                            <tr><td>Flete Cliente</td><td>$2,850,000</td><td>Por viaje</td><td>01/01/2026</td><td>31/12/2026</td><td><span class="o-badge-status o-badge-success">Vigente</span></td></tr>
                            <tr><td>Pago Conductor</td><td>$650,000</td><td>Por viaje</td><td>01/01/2026</td><td>31/12/2026</td><td><span class="o-badge-status o-badge-success">Vigente</span></td></tr>
                            <tr><td>Auxilio Rodamiento</td><td>$80,000</td><td>Por viaje</td><td>01/01/2026</td><td>31/12/2026</td><td><span class="o-badge-status o-badge-success">Vigente</span></td></tr>
                            <tr><td>Descargue</td><td>$120,000</td><td>Por viaje</td><td>01/01/2026</td><td>31/12/2026</td><td><span class="o-badge-status o-badge-success">Vigente</span></td></tr>
                            <tr style="color:var(--o-text-light);"><td>Flete Cliente (anterior)</td><td>$2,650,000</td><td>Por viaje</td><td>01/01/2025</td><td>31/12/2025</td><td><span class="o-badge-status o-badge-secondary">Vencida</span></td></tr>
                        </tbody>
                    </table>
                    <div class="o-add-line"><i class="fas fa-plus"></i> Agregar tarifa</div>
                </div>
            </div>
        </div>
    </div>`;
}

// ===== SCHEDULING LIST VIEW =====
function schedulingListView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb">Programación Diaria</span><button class="o-btn o-btn-primary" onclick="openScheduleForm()"><i class="fas fa-plus"></i> Nuevo</button></div>
        <div class="o-cp-right"><div class="o-searchbar"><i class="fas fa-search"></i><input type="date" value="2026-05-29"></div><div class="o-pager"><span>1-4 / 4</span></div></div>
    </div>
    <div class="o-list-view">
        <table>
            <thead><tr><th style="width:30px;"><input type="checkbox" class="o-checkbox"></th><th>Fecha</th><th>Vehículo</th><th>Trailer</th><th>Conductor</th><th>Ruta</th><th>Cliente</th><th>Tipo</th><th>Remisión</th><th>Estado</th></tr></thead>
            <tbody>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td>29/05/2026</td><td><strong>ABC-123</strong></td><td>TR-001</td><td>Juan Pérez</td><td>Guarne â†’ Rionegro</td><td>ISAGEN</td><td>Normal</td><td>REM-0145</td><td><span class="o-badge-status o-badge-primary">Despachado</span></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td>29/05/2026</td><td><strong>DEF-456</strong></td><td>TR-002</td><td>Carlos López</td><td>Sonson â†’ Tocancipá</td><td>ISAGEN</td><td>Normal</td><td>REM-0146</td><td><span class="o-badge-status o-badge-info">En Ruta</span></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td>29/05/2026</td><td><strong>GHI-789</strong></td><td>â€”</td><td>Miguel Torres</td><td>Marinilla â†’ Bogotá</td><td>Peldar</td><td style="color:var(--o-warning);font-weight:600;">Doblada</td><td>â€”</td><td><span class="o-badge-status o-badge-warning">Programado</span></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td>29/05/2026</td><td><strong>JKL-012</strong></td><td>TR-003</td><td>Andrés Ríos</td><td>Rionegro â†’ Medellín</td><td>Sika</td><td>Normal</td><td>â€”</td><td><span class="o-badge-status o-badge-success">Disponible</span></td></tr>
            </tbody>
        </table>
    </div>`;
}

function openScheduleForm() {
    openModal('Nueva Programación', `
        <div class="o-form-view">
            <div class="o-group">
                <div>
                    <div class="o-field-row"><span class="o-field-label">Fecha</span><span class="o-field-value"><input type="date" value="2026-05-29"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Vehículo</span><span class="o-field-value"><select><option>Seleccionar...</option><option>ABC-123 - Kenworth T800</option><option>DEF-456 - International</option><option>JKL-012 - Kenworth T660</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Trailer</span><span class="o-field-value"><select><option>Ninguno</option><option>TR-001</option><option>TR-002</option><option>TR-003</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Conductor</span><span class="o-field-value"><select><option>Seleccionar...</option><option>Juan Pérez</option><option>Carlos López</option><option>Andrés Ríos</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Ruta</span><span class="o-field-value"><select><option>Seleccionar...</option><option>R-001: Guarne â†’ Rionegro</option><option>R-002: Sonson â†’ Tocancipá</option><option>R-003: Marinilla â†’ Bogotá</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Tipo Viaje</span><span class="o-field-value"><select><option>Normal</option><option>Doblada</option></select></span></div>
                </div>
                <div>
                    <div class="o-field-row"><span class="o-field-label">Cliente</span><span class="o-field-value" style="color:var(--o-text-light);">(automático desde ruta)</span></div>
                    <div class="o-field-row"><span class="o-field-label">Flete</span><span class="o-field-value" style="color:var(--o-text-light);">$2,850,000 / viaje</span></div>
                    <div class="o-field-row"><span class="o-field-label">Pago Conductor</span><span class="o-field-value" style="color:var(--o-text-light);">$650,000</span></div>
                    <div class="o-field-row"><span class="o-field-label">Peajes</span><span class="o-field-value" style="color:var(--o-text-light);">$31,000 (2 peajes)</span></div>
                    <div class="o-field-row"><span class="o-field-label">Combustible est.</span><span class="o-field-value" style="color:var(--o-text-light);">25 galones</span></div>
                    <div class="o-field-row"><span class="o-field-label">Nro. Remisión</span><span class="o-field-value"><input placeholder="REM-2026-XXXX"></span></div>
                </div>
            </div>
        </div>
    `, `<button class="o-btn o-btn-secondary" onclick="closeModal()">Descartar</button><button class="o-btn o-btn-primary" onclick="closeModal()">Guardar</button>`);
}

// ===== DISPATCH LIST VIEW =====
function dispatchListView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb">Despacho de Viajes</span></div>
        <div class="o-cp-right"><div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div><div class="o-pager"><span>1-3 / 3</span></div></div>
    </div>
    <div class="o-list-view">
        <table>
            <thead><tr><th style="width:30px;"><input type="checkbox" class="o-checkbox"></th><th>Consecutivo</th><th>Fecha</th><th>Vehículo</th><th>Conductor</th><th>Ruta</th><th>Docs Vehículo</th><th>Docs Conductor</th><th>Anticipo</th><th>Estado</th><th>Acción</th></tr></thead>
            <tbody>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td><strong>PRG-089</strong></td><td>29/05/2026</td><td>GHI-789</td><td>Miguel Torres</td><td>Marinilla â†’ Bogotá</td><td><span class="o-dot o-dot-green"></span> OK</td><td><span class="o-dot o-dot-green"></span> OK</td><td>$800,000</td><td><span class="o-badge-status o-badge-warning">Pendiente</span></td><td><button class="o-btn o-btn-primary" style="padding:4px 10px;font-size:11px;" onclick="openDispatchForm()">Despachar</button></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td><strong>PRG-090</strong></td><td>29/05/2026</td><td>JKL-012</td><td>Andrés Ríos</td><td>Rionegro â†’ Medellín</td><td><span class="o-dot o-dot-green"></span> OK</td><td><span class="o-dot o-dot-red"></span> Lic. vencida</td><td>$500,000</td><td><span class="o-badge-status o-badge-danger">Bloqueado</span></td><td><button class="o-btn o-btn-secondary" style="padding:4px 10px;font-size:11px;" disabled>Bloqueado</button></td></tr>
                <tr><td><input type="checkbox" class="o-checkbox"></td><td><strong>DSP-0201</strong></td><td>29/05/2026</td><td>ABC-123</td><td>Juan Pérez</td><td>Guarne â†’ Rionegro</td><td><span class="o-dot o-dot-green"></span> OK</td><td><span class="o-dot o-dot-green"></span> OK</td><td>$1,300,000</td><td><span class="o-badge-status o-badge-success">Despachado</span></td><td>â€”</td></tr>
            </tbody>
        </table>
    </div>`;
}

function openDispatchForm() {
    openModal('Despacho - GHI-789 / Miguel Torres', `
        <div class="o-form-view">
            <div class="o-group">
                <div>
                    <div class="o-field-row"><span class="o-field-label">Vehículo</span><span class="o-field-value">GHI-789 - Chevrolet NHR</span></div>
                    <div class="o-field-row"><span class="o-field-label">Conductor</span><span class="o-field-value">Miguel Torres</span></div>
                    <div class="o-field-row"><span class="o-field-label">Ruta</span><span class="o-field-value">Marinilla â†’ Bogotá</span></div>
                    <div class="o-field-row"><span class="o-field-label">Cliente</span><span class="o-field-value">Peldar S.A.</span></div>
                </div>
                <div>
                    <div class="o-field-row"><span class="o-field-label">Anticipo</span><span class="o-field-value"><input type="number" value="800000"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Método Pago</span><span class="o-field-value"><select><option>Consignación</option><option>Efectivo</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Peso Cargue</span><span class="o-field-value"><input placeholder="32.5 ton"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Nro. Manifiesto</span><span class="o-field-value"><input placeholder="MAN-2026-XXXX"></span></div>
                </div>
            </div>
            <h4 style="margin:16px 0 8px;font-size:13px;color:var(--o-text-muted);">CHECKLIST DOCUMENTOS OBLIGATORIOS</h4>
            <div class="o-inline-list">
                <table>
                    <thead><tr><th>Documento</th><th>Estado</th><th>Vencimiento</th></tr></thead>
                    <tbody>
                        <tr><td>SOAT</td><td><span class="o-badge-status o-badge-success">âœ“ Vigente</span></td><td>15/12/2026</td></tr>
                        <tr><td>Tecnomecánica</td><td><span class="o-badge-status o-badge-success">âœ“ Vigente</span></td><td>20/09/2026</td></tr>
                        <tr><td>Seguro Contractual</td><td><span class="o-badge-status o-badge-success">âœ“ Vigente</span></td><td>30/11/2026</td></tr>
                        <tr><td>Licencia Conducción (C2)</td><td><span class="o-badge-status o-badge-success">âœ“ Vigente</span></td><td>01/03/2027</td></tr>
                        <tr><td>Exámenes Médicos</td><td><span class="o-badge-status o-badge-success">âœ“ Vigente</span></td><td>15/08/2026</td></tr>
                        <tr><td>Inspección Preoperacional</td><td><span class="o-badge-status o-badge-success">âœ“ Diligenciada</span></td><td>Hoy</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `, `<button class="o-btn o-btn-secondary" onclick="closeModal()">Cancelar</button><button class="o-btn o-btn-primary" onclick="closeModal()"><i class="fas fa-paper-plane"></i> Confirmar Despacho</button>`);
}

// ===== SETTLEMENT LIST VIEW =====
function settlementListView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb">Liquidación de Viajes</span><button class="o-btn o-btn-primary" onclick="openSettlementForm()"><i class="fas fa-plus"></i> Nuevo</button></div>
        <div class="o-cp-right"><div class="o-searchbar"><i class="fas fa-search"></i><input placeholder="Buscar..."></div><div class="o-pager"><span>1-3 / 3</span></div></div>
    </div>
    <div class="o-list-view">
        <table>
            <thead><tr><th style="width:30px;"><input type="checkbox" class="o-checkbox"></th><th>Consecutivo</th><th>Fecha</th><th>Conductor</th><th>Vehículo</th><th>Ruta</th><th>Total Gastos</th><th>Anticipos</th><th>Saldo</th><th>Estado</th></tr></thead>
            <tbody>
                <tr onclick="openSettlementDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>LIQ-0089</strong></td><td>28/05/2026</td><td>Juan Pérez</td><td>ABC-123</td><td>Guarne â†’ Rionegro</td><td>$1,256,000</td><td>$1,300,000</td><td style="color:var(--o-success);font-weight:600;">+$55,000</td><td><span class="o-badge-status o-badge-warning">En Revisión</span></td></tr>
                <tr onclick="openSettlementDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>LIQ-0088</strong></td><td>27/05/2026</td><td>Carlos López</td><td>DEF-456</td><td>Sonson â†’ Tocancipá</td><td>$2,180,000</td><td>$2,060,000</td><td style="color:var(--o-danger);font-weight:600;">-$120,000</td><td><span class="o-badge-status o-badge-success">Aprobada</span></td></tr>
                <tr onclick="openSettlementDetail()"><td><input type="checkbox" class="o-checkbox"></td><td><strong>LIQ-0087</strong></td><td>26/05/2026</td><td>Miguel Torres</td><td>GHI-789</td><td>Marinilla â†’ Bogotá</td><td>$980,000</td><td>$980,000</td><td>$0</td><td><span class="o-badge-status o-badge-info">Pagada</span></td></tr>
            </tbody>
        </table>
    </div>`;
}

function openSettlementForm() {
    openModal('Nueva Liquidación', `
        <div class="o-form-view">
            <div class="o-group">
                <div>
                    <div class="o-field-row"><span class="o-field-label">Viaje / Despacho</span><span class="o-field-value"><select><option>Seleccionar...</option><option>DSP-0201 - ABC-123 - Guarneâ†’Rionegro</option><option>DSP-0202 - DEF-456 - Sonsonâ†’Tocancipá</option></select></span></div>
                    <div class="o-field-row"><span class="o-field-label">Fecha</span><span class="o-field-value"><input type="date" value="2026-05-29"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Conductor</span><span class="o-field-value" style="color:var(--o-text-light);">(automático)</span></div>
                    <div class="o-field-row"><span class="o-field-label">Vehículo</span><span class="o-field-value" style="color:var(--o-text-light);">(automático)</span></div>
                </div>
                <div>
                    <div class="o-field-row"><span class="o-field-label">KM Inicial</span><span class="o-field-value"><input type="number" placeholder="185420"></span></div>
                    <div class="o-field-row"><span class="o-field-label">KM Final</span><span class="o-field-value"><input type="number" placeholder="185465"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Peso Cargue (ton)</span><span class="o-field-value"><input placeholder="32.5"></span></div>
                    <div class="o-field-row"><span class="o-field-label">Peso Descargue (ton)</span><span class="o-field-value"><input placeholder="32.3"></span></div>
                </div>
            </div>
        </div>
    `, `<button class="o-btn o-btn-secondary" onclick="closeModal()">Descartar</button><button class="o-btn o-btn-primary" onclick="closeModal()">Guardar</button>`);
}

function openSettlementDetail() {
    document.getElementById('mainContent').innerHTML = `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb"><span class="parent" onclick="loadView('settlement')">Liquidaciones</span><span class="separator">/</span>LIQ-0089</span></div>
        <div class="o-cp-right">
            <button class="o-btn o-btn-danger"><i class="fas fa-times"></i> Rechazar</button>
            <button class="o-btn o-btn-success"><i class="fas fa-check"></i> Aprobar</button>
        </div>
    </div>
    <div class="o-form-view">
        <div class="o-form-statusbar">
            <div class="o-statusbar-buttons"></div>
            <div class="o-statusbar-status">
                <span class="o-status-pill done">En Revisión</span>
                <span class="o-status-pill">Aprobada</span>
                <span class="o-status-pill">Pagada</span>
                <span class="o-status-pill">Cerrada</span>
            </div>
        </div>
        <div class="o-group">
            <div>
                <div class="o-field-row"><span class="o-field-label">Conductor</span><span class="o-field-value" style="color:var(--o-brand);font-weight:500;">Juan Pérez</span></div>
                <div class="o-field-row"><span class="o-field-label">Vehículo</span><span class="o-field-value">ABC-123 - Kenworth T800</span></div>
                <div class="o-field-row"><span class="o-field-label">Ruta</span><span class="o-field-value">Guarne â†’ Rionegro-Tanque</span></div>
                <div class="o-field-row"><span class="o-field-label">Cliente</span><span class="o-field-value">ISAGEN S.A. E.S.P.</span></div>
            </div>
            <div>
                <div class="o-field-row"><span class="o-field-label">Fecha Inicio</span><span class="o-field-value">28/05/2026 06:30</span></div>
                <div class="o-field-row"><span class="o-field-label">Fecha Final</span><span class="o-field-value">28/05/2026 14:45</span></div>
                <div class="o-field-row"><span class="o-field-label">KM Recorridos</span><span class="o-field-value">45 km</span></div>
                <div class="o-field-row"><span class="o-field-label">Remisión</span><span class="o-field-value">REM-2026-0145</span></div>
            </div>
        </div>
        <div class="o-notebook">
            <div class="o-notebook-tabs">
                <span class="o-notebook-tab active">Gastos del Viaje</span>
                <span class="o-notebook-tab">Bonificaciones</span>
                <span class="o-notebook-tab">Soportes</span>
                <span class="o-notebook-tab">Seguimiento</span>
            </div>
            <div class="o-notebook-content">
                <div class="o-inline-list">
                    <table>
                        <thead><tr><th>Concepto</th><th>Valor</th><th>Soporte</th><th>Observación</th></tr></thead>
                        <tbody>
                            <tr><td>ACPM (25 gal)</td><td>$375,000</td><td><i class="fas fa-paperclip" style="color:var(--o-brand);"></i></td><td>â€”</td></tr>
                            <tr><td>Peaje Santuario</td><td>$16,800</td><td><i class="fas fa-paperclip" style="color:var(--o-brand);"></i></td><td>Parametrizado</td></tr>
                            <tr><td>Peaje Las Palmas</td><td>$14,200</td><td><i class="fas fa-paperclip" style="color:var(--o-brand);"></i></td><td>Parametrizado</td></tr>
                            <tr><td>Descargue</td><td>$120,000</td><td>â€”</td><td>Parametrizado</td></tr>
                            <tr><td>Auxilio Rodamiento</td><td>$80,000</td><td>â€”</td><td>Parametrizado</td></tr>
                            <tr><td><strong>Pago Conductor</strong></td><td><strong>$650,000</strong></td><td>â€”</td><td>Parametrizado</td></tr>
                        </tbody>
                    </table>
                    <div class="o-add-line"><i class="fas fa-plus"></i> Agregar gasto</div>
                </div>
                <div style="margin-top:16px;background:#F8F9FA;border:1px solid var(--o-border);border-radius:4px;padding:14px;">
                    <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px;"><span>Total Gastos:</span><span>$1,256,000</span></div>
                    <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px;"><span>Bonificaciones:</span><span>$0</span></div>
                    <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:13px;"><span>Anticipos Entregados:</span><span>$1,300,000</span></div>
                    <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:15px;font-weight:700;border-top:1px solid var(--o-border);margin-top:6px;color:var(--o-success);"><span>Saldo a favor conductor:</span><span>+$55,000</span></div>
                </div>
                <div style="margin-top:12px;padding:10px 14px;background:#FFF3CD;border-radius:4px;border:1px solid #FFEEBA;font-size:12px;">
                    <strong><i class="fas fa-info-circle" style="color:#856404;"></i> Info:</strong> ACPM reportado (25 gal) coincide con parametrizado. Peajes coinciden con ruta.
                </div>
            </div>
        </div>
        <div class="o-chatter">
            <div class="o-chatter-title">Historial de Aprobación</div>
            <div class="o-log-item"><div class="o-log-avatar">AT</div><div class="o-log-content"><strong>Andrés T.</strong> creó la liquidación<br><span class="o-log-date">28/05/2026 15:30</span></div></div>
        </div>
    </div>`;
}

// ===== CONFIG VIEW =====
function configView() {
    return `
    <div class="o-control-panel">
        <div class="o-cp-left"><span class="o-breadcrumb">Configuración</span></div>
    </div>
    <div class="o-form-view" style="max-width:100%;">
        <div class="o-notebook">
            <div class="o-notebook-tabs">
                <span class="o-notebook-tab active">Compañías</span>
                <span class="o-notebook-tab">Usuarios</span>
                <span class="o-notebook-tab">Perfiles / Roles</span>
                <span class="o-notebook-tab">Auditoría</span>
            </div>
            <div class="o-notebook-content">
                <div class="o-inline-list">
                    <table>
                        <thead><tr><th>Compañía</th><th>NIT</th><th>Ciudad</th><th>Teléfono</th><th>Email</th><th>Estado</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Cargas del Oriente S.A.</strong></td><td>800.123.456-7</td><td>Marinilla, Antioquia</td><td>(4) 548 45 74</td><td>contacto@cargasdeoriente.com</td><td><span class="o-badge-status o-badge-success">Activa</span></td></tr>
                            <tr><td><strong>Operaciones Mineras S.A.S</strong></td><td>901.456.789-1</td><td>Marinilla, Antioquia</td><td>(4) 548 45 74</td><td>mineras@cargasdeoriente.com</td><td><span class="o-badge-status o-badge-success">Activa</span></td></tr>
                        </tbody>
                    </table>
                </div>
                <h4 style="margin:24px 0 12px;font-size:14px;">Perfiles de Seguridad</h4>
                <div class="o-inline-list">
                    <table>
                        <thead><tr><th>Perfil</th><th>Usuarios</th><th>Lectura</th><th>Escritura</th><th>Creación</th><th>Eliminación</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Administrador</strong></td><td>2</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td></tr>
                            <tr><td><strong>Logística</strong></td><td>5</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-red"></span></td></tr>
                            <tr><td><strong>Mantenimiento</strong></td><td>3</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-red"></span></td><td><span class="o-dot o-dot-red"></span></td></tr>
                            <tr><td><strong>Facturación</strong></td><td>2</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-red"></span></td><td><span class="o-dot o-dot-red"></span></td></tr>
                            <tr><td><strong>Auditor</strong></td><td>1</td><td><span class="o-dot o-dot-green"></span></td><td><span class="o-dot o-dot-red"></span></td><td><span class="o-dot o-dot-red"></span></td><td><span class="o-dot o-dot-red"></span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`;
}
