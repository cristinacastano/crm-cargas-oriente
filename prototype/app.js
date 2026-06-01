// ===== CRM Logístico - Cargas del Oriente - Prototipo Interactivo =====

// Module Templates
const modules = {
    dashboard: getDashboardHTML,
    fleet: getFleetHTML,
    fines: getFinesHTML,
    clients: getClientsHTML,
    routes: getRoutesHTML,
    scheduling: getSchedulingHTML,
    dispatch: getDispatchHTML,
    settlement: getSettlementHTML,
    config: getConfigHTML
};

const moduleTitles = {
    dashboard: 'Dashboard',
    fleet: 'Flota y Mantenimiento › Hoja de Vida Vehículos',
    fines: 'Flota y Mantenimiento › Multas de Tránsito',
    clients: 'Flota y Mantenimiento › Clientes',
    routes: 'Flota y Mantenimiento › Rutas Logísticas',
    scheduling: 'Flota y Mantenimiento › Programación Diaria',
    dispatch: 'Flota y Mantenimiento › Despacho de Viajes',
    settlement: 'Flota y Mantenimiento › Liquidación de Viajes',
    config: 'Configuración y Seguridad'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMenuToggle();
    loadModule('dashboard');
});

// Navigation
function initNavigation() {
    // Main nav items (Dashboard, Config)
    document.querySelectorAll('.nav-item[data-module]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const module = item.dataset.module;
            clearActiveNav();
            item.classList.add('active');
            loadModule(module);
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // Submenu items
    document.querySelectorAll('.nav-subitem[data-module]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const module = item.dataset.module;
            setSubitemActive(item);
            loadModule(module);
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // Group toggle (expand/collapse)
    const groupToggle = document.getElementById('fleetGroupToggle');
    if (groupToggle) {
        groupToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const submenu = document.getElementById('fleetSubmenu');
            const isOpen = submenu.classList.contains('open');
            if (isOpen) {
                submenu.classList.remove('open');
                groupToggle.classList.add('collapsed');
            } else {
                submenu.classList.add('open');
                groupToggle.classList.remove('collapsed');
            }
        });
    }
}

function clearActiveNav() {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.nav-subitem').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.nav-group-toggle').forEach(n => n.classList.remove('has-active'));
}

function setSubitemActive(item) {
    clearActiveNav();
    item.classList.add('active');
    // Highlight parent group
    const group = item.closest('.nav-group');
    if (group) {
        group.querySelector('.nav-group-toggle').classList.add('has-active');
    }
}

function initMenuToggle() {
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

function loadModule(moduleName) {
    const contentArea = document.getElementById('contentArea');
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.textContent = moduleTitles[moduleName] || moduleName;
    contentArea.innerHTML = modules[moduleName]();
    // Re-init any module-specific JS
    if (moduleName === 'fleet') initFleetModule();
    if (moduleName === 'clients') initClientsModule();
    if (moduleName === 'scheduling') initSchedulingModule();
    if (moduleName === 'settlement') initSettlementModule();
}

// Modal functions
function openModal(title, bodyHTML, footerHTML) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    if (footerHTML) document.getElementById('modalFooter').innerHTML = footerHTML;
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// ===== DASHBOARD MODULE =====
function getDashboardHTML() {
    return `
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon green"><i class="fas fa-truck"></i></div>
            <div class="stat-info">
                <span class="stat-value">24</span>
                <span class="stat-label">Vehículos Activos</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon blue"><i class="fas fa-road"></i></div>
            <div class="stat-info">
                <span class="stat-value">12</span>
                <span class="stat-label">Viajes en Ruta</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon orange"><i class="fas fa-tools"></i></div>
            <div class="stat-info">
                <span class="stat-value">3</span>
                <span class="stat-label">En Mantenimiento</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon red"><i class="fas fa-exclamation-circle"></i></div>
            <div class="stat-info">
                <span class="stat-value">7</span>
                <span class="stat-label">Alertas Pendientes</span>
            </div>
        </div>
    </div>
    <div class="dashboard-grid">
        <div class="card">
            <div class="card-header">
                <h3>Programación del Día</h3>
                <span class="date-badge">29 May 2026</span>
            </div>
            <div class="card-body">
                <table class="data-table">
                    <thead><tr><th>Vehículo</th><th>Conductor</th><th>Ruta</th><th>Estado</th></tr></thead>
                    <tbody>
                        <tr><td><strong>ABC-123</strong></td><td>Juan Pérez</td><td>Guarne → Rionegro</td><td><span class="status-badge dispatched">Despachado</span></td></tr>
                        <tr><td><strong>DEF-456</strong></td><td>Carlos López</td><td>Sonson → Tocancipá</td><td><span class="status-badge in-route">En Ruta</span></td></tr>
                        <tr><td><strong>GHI-789</strong></td><td>Miguel Torres</td><td>Marinilla → Bogotá</td><td><span class="status-badge scheduled">Programado</span></td></tr>
                        <tr><td><strong>JKL-012</strong></td><td>Andrés Ríos</td><td>Rionegro → Medellín</td><td><span class="status-badge available">Disponible</span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Alertas de Vencimiento</h3><a href="#" class="link-action">Ver todas</a></div>
            <div class="card-body">
                <div class="alert-list">
                    <div class="alert-item danger"><i class="fas fa-circle"></i><div class="alert-content"><strong>SOAT Vencido</strong><span>ABC-123 - Venció 25/05/2026</span></div></div>
                    <div class="alert-item warning"><i class="fas fa-circle"></i><div class="alert-content"><strong>Tecnomecánica próxima</strong><span>DEF-456 - Vence 05/06/2026</span></div></div>
                    <div class="alert-item warning"><i class="fas fa-circle"></i><div class="alert-content"><strong>Licencia por vencer</strong><span>Carlos López - Vence 10/06/2026</span></div></div>
                    <div class="alert-item danger"><i class="fas fa-circle"></i><div class="alert-content"><strong>Multa pendiente pago</strong><span>Comparendo #45678 - Vence 01/06/2026</span></div></div>
                </div>
            </div>
        </div>
    </div>`;
}

// ===== FLEET MODULE =====
function getFleetHTML() {
    return `
    <div class="action-bar">
        <div class="search-box"><i class="fas fa-search"></i><input type="text" placeholder="Buscar por placa, marca, conductor..."></div>
        <div style="display:flex;gap:8px;">
            <div class="filter-group">
                <button class="filter-btn active">Todos</button>
                <button class="filter-btn">Activos</button>
                <button class="filter-btn">Mantenimiento</button>
                <button class="filter-btn">Inactivos</button>
            </div>
            <button class="btn btn-primary" onclick="openVehicleForm()"><i class="fas fa-plus"></i> Nuevo Vehículo</button>
        </div>
    </div>
    <div class="card">
        <div class="card-body" style="padding:0;">
            <table class="data-table">
                <thead><tr>
                    <th>Placa</th><th>Marca / Línea</th><th>Tipo</th><th>Conductor</th><th>Documentos</th><th>Estado</th><th>Acciones</th>
                </tr></thead>
                <tbody>
                    <tr>
                        <td><strong>ABC-123</strong><br><small style="color:var(--text-light)">Int: V-001</small></td>
                        <td>Kenworth T800<br><small>Modelo 2022</small></td>
                        <td>Tractomula</td>
                        <td>Juan Pérez</td>
                        <td>
                            <span class="semaphore"><span class="semaphore-dot red"></span>SOAT</span>
                            <span class="semaphore"><span class="semaphore-dot green"></span>TM</span>
                        </td>
                        <td><span class="status-badge active">Activo</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openVehicleDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>DEF-456</strong><br><small style="color:var(--text-light)">Int: V-002</small></td>
                        <td>International 9200<br><small>Modelo 2021</small></td>
                        <td>Tractomula</td>
                        <td>Carlos López</td>
                        <td>
                            <span class="semaphore"><span class="semaphore-dot green"></span>SOAT</span>
                            <span class="semaphore"><span class="semaphore-dot yellow"></span>TM</span>
                        </td>
                        <td><span class="status-badge active">Activo</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openVehicleDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>GHI-789</strong><br><small style="color:var(--text-light)">Int: V-003</small></td>
                        <td>Chevrolet NHR<br><small>Modelo 2023</small></td>
                        <td>Turbo</td>
                        <td>Miguel Torres</td>
                        <td>
                            <span class="semaphore"><span class="semaphore-dot green"></span>SOAT</span>
                            <span class="semaphore"><span class="semaphore-dot green"></span>TM</span>
                        </td>
                        <td><span class="status-badge maintenance">Mantenimiento</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openVehicleDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>JKL-012</strong><br><small style="color:var(--text-light)">Int: V-004</small></td>
                        <td>Kenworth T660<br><small>Modelo 2020</small></td>
                        <td>Tractomula</td>
                        <td>Andrés Ríos</td>
                        <td>
                            <span class="semaphore"><span class="semaphore-dot green"></span>SOAT</span>
                            <span class="semaphore"><span class="semaphore-dot green"></span>TM</span>
                        </td>
                        <td><span class="status-badge active">Activo</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openVehicleDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function openVehicleForm() {
    openModal('Nuevo Vehículo', `
        <div class="tabs">
            <div class="tab active">Identificación</div>
            <div class="tab">Datos Técnicos</div>
            <div class="tab">Propiedad</div>
            <div class="tab">Documentos</div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Datos de Identificación</span>
            <div class="form-grid">
                <div class="form-group"><label>Placa Tránsito *</label><input type="text" placeholder="ABC-123"></div>
                <div class="form-group"><label>Placa Interna</label><input type="text" placeholder="V-001"></div>
                <div class="form-group"><label>Marca *</label><select><option>Seleccionar...</option><optgroup label="Carga Pesada"><option>Kenworth</option><option>International</option><option>Freightliner</option><option>Mack</option><option>Volvo</option><option>Scania</option><option>Mercedes-Benz</option><option>DAF</option><option>MAN</option></optgroup><optgroup label="Carga Media / Turbo"><option>Chevrolet</option><option>Hino</option><option>JAC</option><option>Foton</option><option>JMC</option><option>Hyundai</option><option>Mitsubishi Fuso</option><option>Dongfeng</option></optgroup><optgroup label="Carga Liviana"><option>Toyota</option><option>Nissan</option><option>Ford</option><option>Kia</option></optgroup></select></div>
                <div class="form-group"><label>Línea *</label><input type="text" placeholder="T800"></div>
                <div class="form-group"><label>Modelo (Año) *</label><input type="number" placeholder="2024"></div>
                <div class="form-group"><label>Color *</label><input type="text" placeholder="Blanco"></div>
                <div class="form-group"><label>Tipo Carrocería *</label><select><option>Seleccionar...</option><option>Estacas</option><option>Furgón</option><option>Planchón / Plataforma</option><option>Volqueta (Basculante)</option><option>Cisterna / Tanque</option><option>Tauliner (Cortinero)</option><option>Refrigerado</option><option>Cama Baja</option><option>Contenedor</option></select></div>
                <div class="form-group"><label>Tipo Vehículo *</label><select><option>Seleccionar...</option><option>Turbo (C2 liviano - hasta 8 ton)</option><option>Camión Sencillo C2 (2 ejes - 17 ton)</option><option>Dobletroque C3 (3 ejes - 28 ton)</option><option>Minimula C2S1 (3 ejes - 27 ton)</option><option>Tractomula C3S2 (5 ejes - 40.5 ton)</option><option>Tractomula C3S3 (6 ejes - 48 ton)</option><option>Camioneta / Furgoneta (hasta 3.5 ton)</option></select></div>
                <div class="form-group"><label>Cilindraje (cm³) *</label><input type="number" placeholder="15000"></div>
                <div class="form-group"><label>Potencia (HP)</label><input type="number" placeholder="450"></div>
                <div class="form-group"><label>Número Motor *</label><input type="text" placeholder="ABC123456"></div>
                <div class="form-group"><label>Número Chasis *</label><input type="text" placeholder="XYZ789012"></div>
                <div class="form-group"><label>VIN *</label><input type="text" placeholder="1HGBH41JXMN109186"></div>
                <div class="form-group"><label>Financiación *</label><select><option>Seleccionar...</option><option>Leasing</option><option>Recursos Propios</option><option>Permuta</option></select></div>
                <div class="form-group"><label>Estado *</label><select><option>Activo</option><option>Inactivo</option><option>En Mantenimiento</option></select></div>
            </div>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-save"></i> Guardar Vehículo</button>`);
}

function openVehicleDetail() {
    openModal('Hoja de Vida - ABC-123', `
        <div class="tabs">
            <div class="tab active">General</div>
            <div class="tab">Documentos</div>
            <div class="tab">Mantenimiento</div>
            <div class="tab">Costos</div>
            <div class="tab">Multas</div>
        </div>
        <div class="form-grid" style="margin-bottom:20px;">
            <div class="form-group"><label>Placa</label><input value="ABC-123" readonly></div>
            <div class="form-group"><label>Marca / Línea</label><input value="Kenworth T800" readonly></div>
            <div class="form-group"><label>Modelo</label><input value="2022" readonly></div>
            <div class="form-group"><label>Tipo</label><input value="Tractomula" readonly></div>
            <div class="form-group"><label>Conductor Asignado</label><input value="Juan Pérez" readonly></div>
            <div class="form-group"><label>Kilometraje Actual</label><input value="185,420 km" readonly></div>
            <div class="form-group"><label>Estado</label><input value="Activo" readonly></div>
            <div class="form-group"><label>Empresa</label><input value="Cargas del Oriente S.A." readonly></div>
        </div>
        <h4 style="margin-bottom:12px;">Documentos del Vehículo</h4>
        <table class="data-table">
            <thead><tr><th>Documento</th><th>Número</th><th>Vencimiento</th><th>Estado</th></tr></thead>
            <tbody>
                <tr><td>SOAT</td><td>POL-2024-5678</td><td>25/05/2026</td><td><span class="semaphore"><span class="semaphore-dot red"></span> Vencido</span></td></tr>
                <tr><td>Tecnomecánica</td><td>TM-2024-1234</td><td>15/12/2026</td><td><span class="semaphore"><span class="semaphore-dot green"></span> Vigente</span></td></tr>
                <tr><td>Seguro Contractual</td><td>SC-2024-9012</td><td>30/09/2026</td><td><span class="semaphore"><span class="semaphore-dot green"></span> Vigente</span></td></tr>
                <tr><td>Tarjeta de Propiedad</td><td>TP-ANT-45678</td><td>N/A</td><td><span class="semaphore"><span class="semaphore-dot green"></span> Vigente</span></td></tr>
            </tbody>
        </table>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-edit"></i> Editar</button>`);
}

function initFleetModule() {
    // Filter buttons interaction
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ===== FINES MODULE =====
function getFinesHTML() {
    return `
    <div class="action-bar">
        <div class="search-box"><i class="fas fa-search"></i><input type="text" placeholder="Buscar por comparendo, placa, conductor..."></div>
        <div style="display:flex;gap:8px;">
            <div class="filter-group">
                <button class="filter-btn active">Todas</button>
                <button class="filter-btn">Pendientes</button>
                <button class="filter-btn">Pagadas</button>
                <button class="filter-btn">Vencidas</button>
            </div>
            <button class="btn btn-primary" onclick="openFineForm()"><i class="fas fa-plus"></i> Nueva Multa</button>
        </div>
    </div>
    <div class="card">
        <div class="card-body" style="padding:0;">
            <table class="data-table">
                <thead><tr><th>Comparendo</th><th>Fecha</th><th>Vehículo</th><th>Conductor</th><th>Tipo</th><th>Valor</th><th>Vencimiento</th><th>Estado</th></tr></thead>
                <tbody>
                    <tr>
                        <td><strong>#45678</strong></td><td>15/04/2026</td><td>ABC-123</td><td>Juan Pérez</td>
                        <td>Exceso velocidad</td><td>$850,000</td><td>01/06/2026</td>
                        <td><span class="status-badge overdue">Vencida</span></td>
                    </tr>
                    <tr>
                        <td><strong>#45901</strong></td><td>20/05/2026</td><td>DEF-456</td><td>Carlos López</td>
                        <td>Pico y placa</td><td>$438,000</td><td>20/07/2026</td>
                        <td><span class="status-badge pending">Pendiente</span></td>
                    </tr>
                    <tr>
                        <td><strong>#44123</strong></td><td>10/03/2026</td><td>GHI-789</td><td>Miguel Torres</td>
                        <td>Documentación</td><td>$220,000</td><td>10/05/2026</td>
                        <td><span class="status-badge paid">Pagada</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function openFineForm() {
    openModal('Registrar Multa', `
        <div class="form-grid">
            <div class="form-group"><label>Número Comparendo *</label><input type="text" placeholder="#00000"></div>
            <div class="form-group"><label>Fecha Infracción *</label><input type="date"></div>
            <div class="form-group"><label>Vehículo *</label><select><option>Seleccionar...</option><option>ABC-123</option><option>DEF-456</option><option>GHI-789</option></select></div>
            <div class="form-group"><label>Conductor</label><select><option>Seleccionar...</option><option>Juan Pérez</option><option>Carlos López</option><option>Miguel Torres</option></select></div>
            <div class="form-group"><label>Tipo Infracción *</label><select><option>Seleccionar...</option><option>Exceso de velocidad</option><option>Pico y placa</option><option>Documentación</option><option>Otros</option></select></div>
            <div class="form-group"><label>Gravedad *</label><select><option>Leve</option><option>Grave</option><option>Gravísima</option></select></div>
            <div class="form-group"><label>Valor Multa *</label><input type="number" placeholder="$0"></div>
            <div class="form-group"><label>Ciudad / Autoridad *</label><input type="text" placeholder="Medellín - SIMM"></div>
            <div class="form-group"><label>Fecha Límite Pago</label><input type="date"></div>
            <div class="form-group"><label>Responsable Pago</label><select><option>Empresa</option><option>Conductor</option></select></div>
            <div class="form-group" style="grid-column:1/-1;"><label>Adjuntar Comparendo</label><input type="file" accept=".pdf,.jpg,.png"></div>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-save"></i> Registrar Multa</button>`);
}

// ===== CLIENTS MODULE =====
function getClientsHTML() {
    return `
    <div class="action-bar">
        <div class="search-box"><i class="fas fa-search"></i><input type="text" placeholder="Buscar por NIT, razón social..."></div>
        <div style="display:flex;gap:8px;">
            <div class="filter-group">
                <button class="filter-btn active">Todos</button>
                <button class="filter-btn">Activos</button>
                <button class="filter-btn">Prospectos</button>
                <button class="filter-btn">Inactivos</button>
            </div>
            <button class="btn btn-primary" onclick="openClientForm()"><i class="fas fa-plus"></i> Nuevo Cliente</button>
        </div>
    </div>
    <div class="card">
        <div class="card-body" style="padding:0;">
            <table class="data-table">
                <thead><tr><th>NIT/Doc</th><th>Razón Social</th><th>Contacto</th><th>Ciudad</th><th>Rutas</th><th>Estado</th><th>Acciones</th></tr></thead>
                <tbody>
                    <tr>
                        <td><strong>900.123.456-7</strong></td><td>ISAGEN S.A. E.S.P.</td><td>María García<br><small>maria@isagen.com</small></td>
                        <td>Medellín</td><td>3 rutas</td><td><span class="status-badge active">Activo</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openClientDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>800.456.789-1</strong></td><td>Peldar S.A.</td><td>Pedro Martínez<br><small>pedro@peldar.com</small></td>
                        <td>Envigado</td><td>2 rutas</td><td><span class="status-badge active">Activo</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openClientDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>901.234.567-8</strong></td><td>Sika Colombia S.A.S.</td><td>Laura Sánchez<br><small>laura@sika.com</small></td>
                        <td>Tocancipá</td><td>1 ruta</td><td><span class="status-badge prospect">Prospecto</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openClientDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function openClientForm() {
    openModal('Nuevo Cliente', `
        <div class="tabs" id="clientTabs">
            <div class="tab active">General</div>
            <div class="tab">Contactos</div>
            <div class="tab">Rutas</div>
            <div class="tab">Legal</div>
            <div class="tab">Seguridad</div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Información General</span>
            <div class="form-grid">
                <div class="form-group"><label>Tipo Persona *</label><select><option>Persona Jurídica</option><option>Persona Natural</option></select></div>
                <div class="form-group"><label>NIT *</label><input type="text" placeholder="900.123.456"></div>
                <div class="form-group"><label>DV *</label><input type="text" placeholder="7" style="max-width:60px;"></div>
                <div class="form-group"><label>Razón Social *</label><input type="text" placeholder="Empresa S.A.S."></div>
                <div class="form-group"><label>Dirección *</label><input type="text" placeholder="Calle 10 #20-30"></div>
                <div class="form-group"><label>Ciudad *</label><select><option>Seleccionar...</option><option>Medellín</option><option>Bogotá</option><option>Rionegro</option><option>Marinilla</option></select></div>
                <div class="form-group"><label>Departamento *</label><select><option>Seleccionar...</option><option>Antioquia</option><option>Cundinamarca</option></select></div>
                <div class="form-group"><label>País *</label><select><option>Colombia</option></select></div>
                <div class="form-group"><label>Latitud</label><input type="text" placeholder="6.2442"></div>
                <div class="form-group"><label>Longitud</label><input type="text" placeholder="-75.5812"></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Contacto Principal</span>
            <div class="form-grid">
                <div class="form-group"><label>Nombre Contacto *</label><input type="text" placeholder="Nombre completo"></div>
                <div class="form-group"><label>Cargo</label><input type="text" placeholder="Gerente Logística"></div>
                <div class="form-group"><label>Teléfono</label><input type="tel" placeholder="(4) 123 4567"></div>
                <div class="form-group"><label>Celular *</label><input type="tel" placeholder="300 123 4567"></div>
                <div class="form-group"><label>Correo *</label><input type="email" placeholder="contacto@empresa.com"></div>
            </div>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-save"></i> Guardar Cliente</button>`);
}

function openClientDetail() {
    openModal('Cliente - ISAGEN S.A. E.S.P.', `
        <div class="tabs">
            <div class="tab active">General</div>
            <div class="tab">Contactos</div>
            <div class="tab">Rutas</div>
            <div class="tab">Legal</div>
            <div class="tab">Gestión Cliente</div>
            <div class="tab">Seguridad</div>
            <div class="tab">Cotizaciones</div>
            <div class="tab">Fichas Técnicas</div>
        </div>
        <div class="form-grid" style="margin-bottom:20px;">
            <div class="form-group"><label>NIT</label><input value="900.123.456-7" readonly></div>
            <div class="form-group"><label>Razón Social</label><input value="ISAGEN S.A. E.S.P." readonly></div>
            <div class="form-group"><label>Ciudad</label><input value="Medellín, Antioquia" readonly></div>
            <div class="form-group"><label>Estado</label><input value="Activo" readonly></div>
            <div class="form-group"><label>Condición Pago</label><input value="30 días" readonly></div>
            <div class="form-group"><label>Material</label><input value="Carga seca, Químicos" readonly></div>
        </div>
        <h4 style="margin-bottom:12px;">Rutas Contratadas</h4>
        <table class="data-table">
            <thead><tr><th>Ruta</th><th>Producto</th><th>Tipo Vehículo</th><th>Tarifa Vigente</th></tr></thead>
            <tbody>
                <tr><td>Guarne → Rionegro-Tanque</td><td>Carga seca</td><td>Tractomula</td><td>$2,850,000/viaje</td></tr>
                <tr><td>Sonson → Tocancipá</td><td>Químicos</td><td>Cisterna</td><td>$4,200,000/viaje</td></tr>
                <tr><td>Marinilla → Bogotá</td><td>Carga seca</td><td>Tractomula</td><td>$3,500,000/viaje</td></tr>
            </tbody>
        </table>
        <h4 style="margin:20px 0 12px;">Documentos Legales</h4>
        <ul class="checklist">
            <li><span class="check-icon success"><i class="fas fa-check"></i></span> Cámara de Comercio <small style="margin-left:auto;color:var(--text-light)">Cargado 15/01/2026</small></li>
            <li><span class="check-icon success"><i class="fas fa-check"></i></span> RUT <small style="margin-left:auto;color:var(--text-light)">Cargado 15/01/2026</small></li>
            <li><span class="check-icon success"><i class="fas fa-check"></i></span> Cédula Rep. Legal <small style="margin-left:auto;color:var(--text-light)">Cargado 15/01/2026</small></li>
            <li><span class="check-icon warning"><i class="fas fa-exclamation"></i></span> Certificaciones <small style="margin-left:auto;color:var(--text-light)">Pendiente</small></li>
        </ul>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-edit"></i> Editar</button>`);
}

function initClientsModule() {}

// ===== ROUTES MODULE =====
function getRoutesHTML() {
    return `
    <div class="action-bar">
        <div class="search-box"><i class="fas fa-search"></i><input type="text" placeholder="Buscar por código, origen, destino, cliente..."></div>
        <div style="display:flex;gap:8px;">
            <div class="filter-group">
                <button class="filter-btn active">Todas</button>
                <button class="filter-btn">Activas</button>
                <button class="filter-btn">Inactivas</button>
            </div>
            <button class="btn btn-primary" onclick="openRouteForm()"><i class="fas fa-plus"></i> Nueva Ruta</button>
        </div>
    </div>
    <div class="card">
        <div class="card-body" style="padding:0;">
            <table class="data-table">
                <thead><tr><th>Código</th><th>Ruta</th><th>Cliente</th><th>Producto</th><th>Flete Vigente</th><th>Tipo Cobro</th><th>Estado</th><th>Acciones</th></tr></thead>
                <tbody>
                    <tr>
                        <td><strong>R-001</strong></td><td>Guarne → Rionegro-Tanque</td><td>ISAGEN</td><td>Carga seca</td>
                        <td>$2,850,000</td><td>Por viaje</td><td><span class="status-badge active">Activa</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openRouteDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>R-002</strong></td><td>Sonson → Tocancipá</td><td>ISAGEN</td><td>Químicos</td>
                        <td>$4,200,000</td><td>Por viaje</td><td><span class="status-badge active">Activa</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openRouteDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>R-003</strong></td><td>Marinilla → Bogotá</td><td>Peldar</td><td>Vidrio</td>
                        <td>$85,000</td><td>Por tonelada</td><td><span class="status-badge active">Activa</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openRouteDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>R-004</strong></td><td>Rionegro → Medellín</td><td>Sika</td><td>Químicos</td>
                        <td>$1,200,000</td><td>Por viaje</td><td><span class="status-badge inactive">Inactiva</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openRouteDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function openRouteForm() {
    openModal('Nueva Ruta Logística', `
        <div class="tabs">
            <div class="tab active">General</div>
            <div class="tab">Tarifas</div>
            <div class="tab">Peajes</div>
            <div class="tab">Combustible</div>
            <div class="tab">Vehículos</div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Información General</span>
            <div class="form-grid">
                <div class="form-group"><label>Código Ruta *</label><input type="text" placeholder="R-005"></div>
                <div class="form-group"><label>Nombre Ruta *</label><input type="text" placeholder="Guarne - Rionegro Tanque"></div>
                <div class="form-group"><label>Cliente *</label><select><option>Seleccionar...</option><option>ISAGEN</option><option>Peldar</option><option>Sika</option></select></div>
                <div class="form-group"><label>Producto *</label><select><option>Seleccionar...</option><option>Carga seca</option><option>Químicos</option><option>Material peligroso</option><option>Alimentos</option></select></div>
                <div class="form-group"><label>Distancia (km) *</label><input type="number" placeholder="120"></div>
                <div class="form-group"><label>Estado</label><select><option>Activa</option><option>Inactiva</option><option>Suspendida</option></select></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Origen</span>
            <div class="form-grid">
                <div class="form-group"><label>Departamento *</label><select><option>Antioquia</option></select></div>
                <div class="form-group"><label>Ciudad *</label><input type="text" placeholder="Guarne"></div>
                <div class="form-group"><label>Dirección</label><input type="text" placeholder="Zona Industrial"></div>
                <div class="form-group"><label>Latitud</label><input type="text" placeholder="6.2789"></div>
                <div class="form-group"><label>Longitud</label><input type="text" placeholder="-75.4567"></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Destino</span>
            <div class="form-grid">
                <div class="form-group"><label>Departamento *</label><select><option>Antioquia</option><option>Cundinamarca</option></select></div>
                <div class="form-group"><label>Ciudad *</label><input type="text" placeholder="Rionegro"></div>
                <div class="form-group"><label>Dirección</label><input type="text" placeholder="Tanque almacenamiento"></div>
                <div class="form-group"><label>Latitud</label><input type="text" placeholder="6.1567"></div>
                <div class="form-group"><label>Longitud</label><input type="text" placeholder="-75.3789"></div>
            </div>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-save"></i> Guardar Ruta</button>`);
}

function openRouteDetail() {
    openModal('Ruta R-001: Guarne → Rionegro-Tanque', `
        <div class="tabs">
            <div class="tab active">General</div>
            <div class="tab">Tarifas</div>
            <div class="tab">Peajes</div>
            <div class="tab">Combustible</div>
            <div class="tab">Vehículos</div>
        </div>
        <div class="form-grid" style="margin-bottom:20px;">
            <div class="form-group"><label>Código</label><input value="R-001" readonly></div>
            <div class="form-group"><label>Cliente</label><input value="ISAGEN S.A. E.S.P." readonly></div>
            <div class="form-group"><label>Producto</label><input value="Carga seca" readonly></div>
            <div class="form-group"><label>Distancia</label><input value="45 km" readonly></div>
            <div class="form-group"><label>Origen</label><input value="Guarne, Antioquia" readonly></div>
            <div class="form-group"><label>Destino</label><input value="Rionegro-Tanque, Antioquia" readonly></div>
        </div>
        <h4 style="margin-bottom:12px;">Vigencias Tarifarias</h4>
        <table class="data-table">
            <thead><tr><th>Concepto</th><th>Valor</th><th>Tipo</th><th>Vigencia</th><th>Estado</th></tr></thead>
            <tbody>
                <tr><td>Flete Cliente</td><td>$2,850,000</td><td>Por viaje</td><td>01/01/2026 - 31/12/2026</td><td><span class="status-badge active">Vigente</span></td></tr>
                <tr><td>Pago Conductor</td><td>$650,000</td><td>Por viaje</td><td>01/01/2026 - 31/12/2026</td><td><span class="status-badge active">Vigente</span></td></tr>
                <tr><td>Auxilio Rodamiento</td><td>$80,000</td><td>Por viaje</td><td>01/01/2026 - 31/12/2026</td><td><span class="status-badge active">Vigente</span></td></tr>
                <tr><td>Descargue</td><td>$120,000</td><td>Por viaje</td><td>01/01/2026 - 31/12/2026</td><td><span class="status-badge active">Vigente</span></td></tr>
            </tbody>
        </table>
        <h4 style="margin:20px 0 12px;">Peajes Parametrizados</h4>
        <table class="data-table">
            <thead><tr><th>Peaje</th><th>Ubicación</th><th>Valor</th><th>Tipo Vehículo</th><th>Estado</th></tr></thead>
            <tbody>
                <tr><td>Peaje Santuario</td><td>Km 15</td><td>$16,800</td><td>Tractomula</td><td><span class="status-badge active">Activo</span></td></tr>
                <tr><td>Peaje Las Palmas</td><td>Km 32</td><td>$14,200</td><td>Tractomula</td><td><span class="status-badge active">Activo</span></td></tr>
            </tbody>
        </table>
        <h4 style="margin:20px 0 12px;">Combustible Estimado</h4>
        <div class="form-grid">
            <div class="form-group"><label>Galones Estimados</label><input value="25 gal" readonly></div>
            <div class="form-group"><label>Rendimiento</label><input value="5.5 km/gal" readonly></div>
            <div class="form-group"><label>Tipo Vehículo</label><input value="Tractomula" readonly></div>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-edit"></i> Editar</button>`);
}

// ===== SCHEDULING MODULE =====
function getSchedulingHTML() {
    return `
    <div class="action-bar">
        <div style="display:flex;align-items:center;gap:12px;">
            <div class="search-box" style="min-width:180px;"><i class="fas fa-calendar"></i><input type="date" value="2026-05-29"></div>
            <div class="filter-group">
                <button class="filter-btn active">Todos</button>
                <button class="filter-btn">Disponibles</button>
                <button class="filter-btn">Programados</button>
                <button class="filter-btn">Despachados</button>
            </div>
        </div>
        <button class="btn btn-primary" onclick="openScheduleForm()"><i class="fas fa-plus"></i> Nueva Programación</button>
    </div>
    <div class="card">
        <div class="card-header">
            <h3>Programación - 29 de Mayo 2026</h3>
            <span class="date-badge">4 vehículos programados</span>
        </div>
        <div class="card-body" style="padding:0;">
            <table class="data-table">
                <thead><tr><th>Vehículo</th><th>Trailer</th><th>Conductor</th><th>Ruta</th><th>Cliente</th><th>Tipo</th><th>Remisión</th><th>Estado</th><th>Acciones</th></tr></thead>
                <tbody>
                    <tr>
                        <td><strong>ABC-123</strong><br><small>Tractomula</small></td>
                        <td>TR-001</td>
                        <td>Juan Pérez</td>
                        <td>Guarne → Rionegro</td>
                        <td>ISAGEN</td>
                        <td>Normal</td>
                        <td>REM-2026-0145</td>
                        <td><span class="status-badge dispatched">Despachado</span></td>
                        <td><button class="btn btn-sm btn-secondary"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>DEF-456</strong><br><small>Tractomula</small></td>
                        <td>TR-002</td>
                        <td>Carlos López</td>
                        <td>Sonson → Tocancipá</td>
                        <td>ISAGEN</td>
                        <td>Normal</td>
                        <td>REM-2026-0146</td>
                        <td><span class="status-badge in-route">En Ruta</span></td>
                        <td><button class="btn btn-sm btn-secondary"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>GHI-789</strong><br><small>Turbo</small></td>
                        <td>—</td>
                        <td>Miguel Torres</td>
                        <td>Marinilla → Bogotá</td>
                        <td>Peldar</td>
                        <td><span style="color:var(--secondary);font-weight:600;">Doblada</span></td>
                        <td>—</td>
                        <td><span class="status-badge scheduled">Programado</span></td>
                        <td><button class="btn btn-sm btn-primary" onclick="openDispatchAction()"><i class="fas fa-shipping-fast"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>JKL-012</strong><br><small>Tractomula</small></td>
                        <td>TR-003</td>
                        <td>Andrés Ríos</td>
                        <td>Rionegro → Medellín</td>
                        <td>Sika</td>
                        <td>Normal</td>
                        <td>—</td>
                        <td><span class="status-badge available">Disponible</span></td>
                        <td><button class="btn btn-sm btn-secondary"><i class="fas fa-edit"></i></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div style="margin-top:20px;">
        <div class="card">
            <div class="card-header"><h3>Semáforo Operativo</h3></div>
            <div class="card-body">
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
                    <div style="display:flex;align-items:center;gap:8px;"><span class="semaphore-dot green" style="width:14px;height:14px;"></span><strong>15</strong> Disponibles</div>
                    <div style="display:flex;align-items:center;gap:8px;"><span class="semaphore-dot yellow" style="width:14px;height:14px;border-radius:50%;background:#FF9800;"></span><strong>4</strong> Próximo vencimiento docs</div>
                    <div style="display:flex;align-items:center;gap:8px;"><span class="semaphore-dot red" style="width:14px;height:14px;"></span><strong>3</strong> Bloqueados / Mantenimiento</div>
                </div>
            </div>
        </div>
    </div>`;
}

function openScheduleForm() {
    openModal('Nueva Programación', `
        <div class="form-section">
            <span class="form-section-title">Asignación de Vehículo</span>
            <div class="form-grid">
                <div class="form-group"><label>Fecha Programación *</label><input type="date" value="2026-05-29"></div>
                <div class="form-group"><label>Vehículo *</label><select><option>Seleccionar...</option><option>ABC-123 - Kenworth T800</option><option>DEF-456 - International 9200</option><option>JKL-012 - Kenworth T660</option></select></div>
                <div class="form-group"><label>Trailer</label><select><option>Seleccionar...</option><option>TR-001</option><option>TR-002</option><option>TR-003</option></select></div>
                <div class="form-group"><label>Conductor *</label><select><option>Seleccionar...</option><option>Juan Pérez</option><option>Carlos López</option><option>Andrés Ríos</option></select></div>
                <div class="form-group"><label>Conductor Secundario</label><select><option>Ninguno</option><option>Juan Pérez</option><option>Carlos López</option></select></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Asignación de Ruta</span>
            <div class="form-grid">
                <div class="form-group"><label>Ruta *</label><select><option>Seleccionar...</option><option>R-001: Guarne → Rionegro</option><option>R-002: Sonson → Tocancipá</option><option>R-003: Marinilla → Bogotá</option></select></div>
                <div class="form-group"><label>Tipo Viaje</label><select><option>Normal</option><option>Doblada</option></select></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Información Automática (desde ruta)</span>
            <div class="summary-box">
                <div class="summary-row"><span>Cliente:</span><span>ISAGEN S.A. E.S.P.</span></div>
                <div class="summary-row"><span>Flete:</span><span>$2,850,000 / viaje</span></div>
                <div class="summary-row"><span>Pago Conductor:</span><span>$650,000</span></div>
                <div class="summary-row"><span>Peajes:</span><span>$31,000 (2 peajes)</span></div>
                <div class="summary-row"><span>Combustible est.:</span><span>25 galones</span></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Documentos</span>
            <div class="form-grid">
                <div class="form-group"><label>Número Remisión</label><input type="text" placeholder="REM-2026-XXXX"></div>
                <div class="form-group"><label>Número Manifiesto</label><input type="text" placeholder="MAN-2026-XXXX"></div>
            </div>
        </div>
        <div class="form-group"><label>Observaciones</label><textarea placeholder="Novedades operativas..."></textarea></div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-save"></i> Guardar Programación</button>`);
}

function initSchedulingModule() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ===== DISPATCH MODULE =====
function getDispatchHTML() {
    return `
    <div class="action-bar">
        <div class="search-box"><i class="fas fa-search"></i><input type="text" placeholder="Buscar viaje por placa, conductor, ruta..."></div>
        <div class="filter-group">
            <button class="filter-btn active">Pendientes</button>
            <button class="filter-btn">Despachados</button>
            <button class="filter-btn">Entregados</button>
        </div>
    </div>
    <div class="card">
        <div class="card-header"><h3>Viajes Pendientes de Despacho</h3></div>
        <div class="card-body" style="padding:0;">
            <table class="data-table">
                <thead><tr><th>Programación</th><th>Vehículo</th><th>Conductor</th><th>Ruta</th><th>Documentos</th><th>Anticipo</th><th>Acciones</th></tr></thead>
                <tbody>
                    <tr>
                        <td><strong>PRG-2026-089</strong><br><small>29/05/2026</small></td>
                        <td>GHI-789<br><small>Turbo</small></td>
                        <td>Miguel Torres</td>
                        <td>Marinilla → Bogotá</td>
                        <td>
                            <span class="semaphore"><span class="semaphore-dot green"></span>Veh</span>
                            <span class="semaphore"><span class="semaphore-dot green"></span>Cond</span>
                        </td>
                        <td>$800,000</td>
                        <td><button class="btn btn-sm btn-primary" onclick="openDispatchAction()"><i class="fas fa-shipping-fast"></i> Despachar</button></td>
                    </tr>
                    <tr>
                        <td><strong>PRG-2026-090</strong><br><small>29/05/2026</small></td>
                        <td>JKL-012<br><small>Tractomula</small></td>
                        <td>Andrés Ríos</td>
                        <td>Rionegro → Medellín</td>
                        <td>
                            <span class="semaphore"><span class="semaphore-dot green"></span>Veh</span>
                            <span class="semaphore"><span class="semaphore-dot red"></span>Cond</span>
                        </td>
                        <td>$500,000</td>
                        <td><button class="btn btn-sm btn-secondary" disabled title="Documentos pendientes"><i class="fas fa-ban"></i> Bloqueado</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div style="margin-top:20px;">
        <div class="card">
            <div class="card-header"><h3>Viajes Despachados Hoy</h3></div>
            <div class="card-body" style="padding:0;">
                <table class="data-table">
                    <thead><tr><th>Consecutivo</th><th>Vehículo</th><th>Conductor</th><th>Ruta</th><th>Hora Despacho</th><th>Estado</th></tr></thead>
                    <tbody>
                        <tr><td><strong>DSP-2026-0201</strong></td><td>ABC-123</td><td>Juan Pérez</td><td>Guarne → Rionegro</td><td>06:30 AM</td><td><span class="status-badge dispatched">Despachado</span></td></tr>
                        <tr><td><strong>DSP-2026-0202</strong></td><td>DEF-456</td><td>Carlos López</td><td>Sonson → Tocancipá</td><td>07:15 AM</td><td><span class="status-badge in-route">En Ruta</span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
}

function openDispatchAction() {
    openModal('Despacho de Viaje - GHI-789', `
        <div class="form-section">
            <span class="form-section-title">Información del Viaje</span>
            <div class="form-grid">
                <div class="form-group"><label>Vehículo</label><input value="GHI-789 - Chevrolet NHR (Turbo)" readonly></div>
                <div class="form-group"><label>Conductor</label><input value="Miguel Torres" readonly></div>
                <div class="form-group"><label>Ruta</label><input value="Marinilla → Bogotá" readonly></div>
                <div class="form-group"><label>Cliente</label><input value="Peldar S.A." readonly></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Checklist Documentos Obligatorios</span>
            <ul class="checklist">
                <li><span class="check-icon success"><i class="fas fa-check"></i></span> SOAT Vigente <small style="margin-left:auto;">Vence: 15/12/2026</small></li>
                <li><span class="check-icon success"><i class="fas fa-check"></i></span> Tecnomecánica Vigente <small style="margin-left:auto;">Vence: 20/09/2026</small></li>
                <li><span class="check-icon success"><i class="fas fa-check"></i></span> Seguro Contractual <small style="margin-left:auto;">Vence: 30/11/2026</small></li>
                <li><span class="check-icon success"><i class="fas fa-check"></i></span> Licencia Conducción <small style="margin-left:auto;">Cat: C2 - Vence: 01/03/2027</small></li>
                <li><span class="check-icon success"><i class="fas fa-check"></i></span> Exámenes Médicos <small style="margin-left:auto;">Vigentes</small></li>
                <li><span class="check-icon success"><i class="fas fa-check"></i></span> Inspección Preoperacional <small style="margin-left:auto;">Diligenciada hoy</small></li>
            </ul>
        </div>
        <div class="form-section">
            <span class="form-section-title">Anticipo del Viaje</span>
            <div class="form-grid">
                <div class="form-group"><label>Valor Anticipo *</label><input type="number" value="800000"></div>
                <div class="form-group"><label>Método</label><select><option>Consignación</option><option>Efectivo</option><option>Transferencia</option></select></div>
                <div class="form-group"><label>Comprobante</label><input type="file" accept=".pdf,.jpg,.png"></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Información de Cargue</span>
            <div class="form-grid">
                <div class="form-group"><label>Peso Cargue (ton)</label><input type="number" placeholder="32.5"></div>
                <div class="form-group"><label>Remisión Cliente</label><input type="text" placeholder="RC-2026-XXXX"></div>
                <div class="form-group"><label>Número Manifiesto</label><input type="text" placeholder="MAN-2026-XXXX"></div>
            </div>
        </div>
        <div class="form-group"><label>Observaciones</label><textarea placeholder="Novedades del despacho..."></textarea></div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-shipping-fast"></i> Confirmar Despacho</button>`);
}

// ===== SETTLEMENT MODULE =====
function getSettlementHTML() {
    return `
    <div class="action-bar">
        <div class="search-box"><i class="fas fa-search"></i><input type="text" placeholder="Buscar por consecutivo, conductor, vehículo..."></div>
        <div style="display:flex;gap:8px;">
            <div class="filter-group">
                <button class="filter-btn active">Todas</button>
                <button class="filter-btn">En Revisión</button>
                <button class="filter-btn">Aprobadas</button>
                <button class="filter-btn">Pagadas</button>
            </div>
            <button class="btn btn-primary" onclick="openSettlementForm()"><i class="fas fa-plus"></i> Nueva Liquidación</button>
        </div>
    </div>
    <div class="card">
        <div class="card-body" style="padding:0;">
            <table class="data-table">
                <thead><tr><th>Consecutivo</th><th>Fecha</th><th>Conductor</th><th>Vehículo</th><th>Ruta</th><th>Total Gastos</th><th>Saldo</th><th>Estado</th><th>Acciones</th></tr></thead>
                <tbody>
                    <tr>
                        <td><strong>LIQ-2026-0089</strong></td><td>28/05/2026</td><td>Juan Pérez</td><td>ABC-123</td>
                        <td>Guarne → Rionegro</td><td>$1,245,000</td><td style="color:#2E7D32;font-weight:600;">+$55,000</td>
                        <td><span class="status-badge review">En Revisión</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openSettlementDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>LIQ-2026-0088</strong></td><td>27/05/2026</td><td>Carlos López</td><td>DEF-456</td>
                        <td>Sonson → Tocancipá</td><td>$2,180,000</td><td style="color:#C62828;font-weight:600;">-$120,000</td>
                        <td><span class="status-badge approved">Aprobada</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openSettlementDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                    <tr>
                        <td><strong>LIQ-2026-0087</strong></td><td>26/05/2026</td><td>Miguel Torres</td><td>GHI-789</td>
                        <td>Marinilla → Bogotá</td><td>$980,000</td><td style="color:#2E7D32;font-weight:600;">$0</td>
                        <td><span class="status-badge paid">Pagada</span></td>
                        <td><button class="btn btn-sm btn-secondary" onclick="openSettlementDetail()"><i class="fas fa-eye"></i></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

function openSettlementForm() {
    openModal('Nueva Liquidación de Viaje', `
        <div class="tabs">
            <div class="tab active">General</div>
            <div class="tab">Gastos</div>
            <div class="tab">Bonificaciones</div>
            <div class="tab">Soportes</div>
            <div class="tab">Resumen</div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Información del Viaje</span>
            <div class="form-grid">
                <div class="form-group"><label>Viaje / Despacho *</label><select><option>Seleccionar...</option><option>DSP-2026-0201 - ABC-123 - Guarne→Rionegro</option><option>DSP-2026-0202 - DEF-456 - Sonson→Tocancipá</option></select></div>
                <div class="form-group"><label>Fecha Liquidación</label><input type="date" value="2026-05-29"></div>
                <div class="form-group"><label>Conductor</label><input value="Juan Pérez" readonly></div>
                <div class="form-group"><label>Vehículo</label><input value="ABC-123" readonly></div>
                <div class="form-group"><label>Ruta</label><input value="Guarne → Rionegro" readonly></div>
                <div class="form-group"><label>Cliente</label><input value="ISAGEN S.A." readonly></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Información de Carga</span>
            <div class="form-grid">
                <div class="form-group"><label>Peso Cargue (ton)</label><input type="number" placeholder="32.5"></div>
                <div class="form-group"><label>Peso Descargue (ton)</label><input type="number" placeholder="32.3"></div>
                <div class="form-group"><label>Valor/Tonelada Conductor</label><input value="$20,000" readonly></div>
                <div class="form-group"><label>Cantidad Toneladas</label><input type="number" placeholder="32.5"></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Kilometraje</span>
            <div class="form-grid">
                <div class="form-group"><label>KM Inicial *</label><input type="number" placeholder="185420"></div>
                <div class="form-group"><label>KM Final *</label><input type="number" placeholder="185465"></div>
                <div class="form-group"><label>Total KM</label><input value="45" readonly></div>
            </div>
        </div>
        <div class="form-section">
            <span class="form-section-title">Combustible</span>
            <div class="form-grid">
                <div class="form-group"><label>Consecutivo ACPM</label><input type="text" placeholder="ACPM-2026-XXX"></div>
                <div class="form-group"><label>Cantidad ACPM (gal)</label><input type="number" placeholder="25"></div>
                <div class="form-group"><label>Valor ACPM</label><input type="number" placeholder="$375,000"></div>
            </div>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-save"></i> Guardar Liquidación</button>`);
}

function openSettlementDetail() {
    openModal('Liquidación LIQ-2026-0089', `
        <div class="tabs">
            <div class="tab active">General</div>
            <div class="tab">Gastos</div>
            <div class="tab">Bonificaciones</div>
            <div class="tab">Soportes</div>
            <div class="tab">Resumen</div>
        </div>
        <div class="form-grid" style="margin-bottom:20px;">
            <div class="form-group"><label>Conductor</label><input value="Juan Pérez" readonly></div>
            <div class="form-group"><label>Vehículo</label><input value="ABC-123 - Kenworth T800" readonly></div>
            <div class="form-group"><label>Ruta</label><input value="Guarne → Rionegro-Tanque" readonly></div>
            <div class="form-group"><label>Cliente</label><input value="ISAGEN S.A. E.S.P." readonly></div>
            <div class="form-group"><label>Fecha Inicio</label><input value="28/05/2026 06:30" readonly></div>
            <div class="form-group"><label>Fecha Final</label><input value="28/05/2026 14:45" readonly></div>
            <div class="form-group"><label>KM Recorridos</label><input value="45 km" readonly></div>
            <div class="form-group"><label>Remisión</label><input value="REM-2026-0145" readonly></div>
        </div>
        <h4 style="margin-bottom:12px;">Detalle de Gastos</h4>
        <table class="data-table">
            <thead><tr><th>Concepto</th><th>Valor</th><th>Soporte</th><th>Observación</th></tr></thead>
            <tbody>
                <tr><td>ACPM (25 gal)</td><td>$375,000</td><td><i class="fas fa-paperclip" style="color:var(--primary)"></i></td><td>—</td></tr>
                <tr><td>Peaje Santuario</td><td>$16,800</td><td><i class="fas fa-paperclip" style="color:var(--primary)"></i></td><td>Parametrizado</td></tr>
                <tr><td>Peaje Las Palmas</td><td>$14,200</td><td><i class="fas fa-paperclip" style="color:var(--primary)"></i></td><td>Parametrizado</td></tr>
                <tr><td>Descargue</td><td>$120,000</td><td>—</td><td>Parametrizado</td></tr>
                <tr><td>Auxilio Rodamiento</td><td>$80,000</td><td>—</td><td>Parametrizado</td></tr>
                <tr><td>Pago Conductor</td><td>$650,000</td><td>—</td><td>Parametrizado</td></tr>
            </tbody>
        </table>
        <div class="summary-box" style="margin-top:20px;">
            <div class="summary-row"><span>Total Gastos:</span><span>$1,256,000</span></div>
            <div class="summary-row"><span>Bonificaciones:</span><span>$0</span></div>
            <div class="summary-row"><span>Anticipos Entregados:</span><span>$1,300,000</span></div>
            <div class="summary-row"><span>Pago Conductor:</span><span>$650,000</span></div>
            <div class="summary-row"><span><strong>Saldo a favor conductor:</strong></span><span style="color:#2E7D32;"><strong>+$55,000</strong></span></div>
        </div>
        <div style="margin-top:16px;padding:12px;background:#FFF8E1;border-radius:8px;border-left:3px solid #FF9800;">
            <strong style="font-size:13px;"><i class="fas fa-exclamation-triangle" style="color:#FF9800;"></i> Alerta:</strong>
            <span style="font-size:12px;"> ACPM reportado (25 gal) coincide con parametrizado (25 gal). Sin diferencias.</span>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button><button class="btn btn-warning" onclick="closeModal()"><i class="fas fa-undo"></i> Rechazar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-check"></i> Aprobar</button>`);
}

function initSettlementModule() {}

// ===== CONFIG MODULE =====
function getConfigHTML() {
    return `
    <div class="stats-grid" style="margin-bottom:24px;">
        <div class="stat-card" style="cursor:pointer;" onclick="openCompanyConfig()">
            <div class="stat-icon green"><i class="fas fa-building"></i></div>
            <div class="stat-info">
                <span class="stat-value" style="font-size:18px;">Compañías</span>
                <span class="stat-label">Gestión multiempresa</span>
            </div>
        </div>
        <div class="stat-card" style="cursor:pointer;" onclick="openUsersConfig()">
            <div class="stat-icon blue"><i class="fas fa-users"></i></div>
            <div class="stat-info">
                <span class="stat-value" style="font-size:18px;">Usuarios</span>
                <span class="stat-label">Roles y permisos</span>
            </div>
        </div>
        <div class="stat-card" style="cursor:pointer;">
            <div class="stat-icon orange"><i class="fas fa-shield-alt"></i></div>
            <div class="stat-info">
                <span class="stat-value" style="font-size:18px;">Seguridad</span>
                <span class="stat-label">Reglas de acceso</span>
            </div>
        </div>
        <div class="stat-card" style="cursor:pointer;">
            <div class="stat-icon red"><i class="fas fa-history"></i></div>
            <div class="stat-info">
                <span class="stat-value" style="font-size:18px;">Auditoría</span>
                <span class="stat-label">Registro de cambios</span>
            </div>
        </div>
    </div>
    <div class="dashboard-grid">
        <div class="card">
            <div class="card-header"><h3>Compañías Registradas</h3></div>
            <div class="card-body">
                <table class="data-table">
                    <thead><tr><th>Compañía</th><th>NIT</th><th>Ciudad</th><th>Estado</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Cargas del Oriente S.A.</strong></td><td>800.123.456-7</td><td>Marinilla</td><td><span class="status-badge active">Activa</span></td></tr>
                        <tr><td><strong>Operaciones Mineras S.A.S</strong></td><td>901.456.789-1</td><td>Marinilla</td><td><span class="status-badge active">Activa</span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h3>Perfiles de Usuario</h3></div>
            <div class="card-body">
                <table class="data-table">
                    <thead><tr><th>Perfil</th><th>Usuarios</th><th>Permisos</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Administrador</strong></td><td>2</td><td>Lectura, Escritura, Creación, Eliminación</td></tr>
                        <tr><td><strong>Logística</strong></td><td>5</td><td>Lectura, Escritura, Creación</td></tr>
                        <tr><td><strong>Mantenimiento</strong></td><td>3</td><td>Lectura, Escritura</td></tr>
                        <tr><td><strong>Facturación</strong></td><td>2</td><td>Lectura, Escritura</td></tr>
                        <tr><td><strong>Auditor</strong></td><td>1</td><td>Solo Lectura</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
}

function openCompanyConfig() {
    openModal('Configuración de Compañía', `
        <div class="form-grid">
            <div class="form-group"><label>Razón Social *</label><input value="Cargas del Oriente S.A."></div>
            <div class="form-group"><label>Tipo Documento</label><select><option>NIT</option></select></div>
            <div class="form-group"><label>NIT *</label><input value="800.123.456"></div>
            <div class="form-group"><label>DV *</label><input value="7" style="max-width:60px;"></div>
            <div class="form-group"><label>Dirección *</label><input value="Calle 22 N° 26-110"></div>
            <div class="form-group"><label>Ciudad *</label><input value="Marinilla"></div>
            <div class="form-group"><label>Departamento *</label><input value="Antioquia"></div>
            <div class="form-group"><label>País *</label><input value="Colombia"></div>
            <div class="form-group"><label>Teléfono</label><input value="(4) 548 45 74"></div>
            <div class="form-group"><label>Email Corporativo</label><input value="contacto@cargasdeoriente.com"></div>
            <div class="form-group"><label>Sitio Web</label><input value="https://cargasdeloriente.com"></div>
        </div>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn btn-primary" onclick="closeModal()"><i class="fas fa-save"></i> Guardar</button>`);
}

function openUsersConfig() {
    openModal('Gestión de Usuarios', `
        <div class="action-bar" style="margin-bottom:16px;">
            <div class="search-box" style="min-width:200px;"><i class="fas fa-search"></i><input type="text" placeholder="Buscar usuario..."></div>
            <button class="btn btn-sm btn-primary"><i class="fas fa-plus"></i> Nuevo Usuario</button>
        </div>
        <table class="data-table">
            <thead><tr><th>Usuario</th><th>Email</th><th>Perfil</th><th>Compañías</th><th>Estado</th></tr></thead>
            <tbody>
                <tr><td><strong>Cristina Castaño</strong></td><td>cristina@cargasdeoriente.com</td><td>Administrador</td><td>Todas</td><td><span class="status-badge active">Activo</span></td></tr>
                <tr><td><strong>Andrés Torres</strong></td><td>andres@cargasdeoriente.com</td><td>Logística</td><td>Cargas del Oriente</td><td><span class="status-badge active">Activo</span></td></tr>
                <tr><td><strong>María López</strong></td><td>maria@cargasdeoriente.com</td><td>Facturación</td><td>Cargas del Oriente</td><td><span class="status-badge active">Activo</span></td></tr>
                <tr><td><strong>Pedro Gómez</strong></td><td>pedro@cargasdeoriente.com</td><td>Mantenimiento</td><td>Cargas del Oriente</td><td><span class="status-badge active">Activo</span></td></tr>
                <tr><td><strong>Auditor Externo</strong></td><td>auditor@externo.com</td><td>Auditor</td><td>Todas</td><td><span class="status-badge active">Activo</span></td></tr>
            </tbody>
        </table>
    `, `<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>`);
}
