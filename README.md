
# Sistema de Préstamos de Equipos de Laboratorio

**Estudiante:** Anthony Jacob Barrios Pérez  
**Carné:** 0902-20-9735  
**Proyecto:** Tarea 4 - Aplicación React con TypeScript

## Descripción

Este proyecto consiste en una aplicación web desarrollada para administrar el préstamo y la devolución de equipos de un laboratorio universitario.

El sistema permite consultar los equipos disponibles, registrar préstamos, validar los datos de los solicitantes y llevar un control de los equipos que todavía no han sido devueltos.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- CSS
- JSON Server
- Git y GitHub

## Funcionalidades principales

- Visualización del inventario de equipos.
- Búsqueda de equipos por nombre.
- Filtrado por categorías.
- Registro de préstamos.
- Validación del nombre y carné del solicitante.
- Validación de fechas límite, con un máximo de dos días y sin fines de semana.
- Identificación de equipos disponibles y prestados.
- Visualización de préstamos activos y vencidos.
- Registro de devoluciones.
- Actualización de la disponibilidad de los equipos.
- Persistencia de información mediante JSON Server.
- Manejo de errores de conexión.

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/abarriosp6-crypto/prestamos-lab.git
```

2. Ingresar a la carpeta:

```bash
cd prestamos-lab
```

3. Instalar las dependencias:

```bash
npm install
```

## Ejecución

Es necesario utilizar dos terminales.

### Terminal 1: Servidor de datos

```bash
npx json-server ./db.json --port 3003
```

La API estará disponible en:

- http://localhost:3003/equipos
- http://localhost:3003/prestamos

### Terminal 2: Aplicación React

```bash
npm run dev
```

Abrir en el navegador:

http://localhost:5173

**Importante:** ambos servidores deben permanecer ejecutándose para utilizar todas las funcionalidades.

## Estructura del proyecto

- `src/components/`: componentes de la interfaz.
- `src/pages/`: pantalla de préstamos activos.
- `src/hooks/`: lógica reutilizable de React.
- `src/services/`: comunicación con la API.
- `src/types/`: interfaces de TypeScript.
- `src/App.tsx`: componente principal.
- `db.json`: almacenamiento de equipos y préstamos.

## Conclusión

Con el desarrollo de este proyecto se pusieron en práctica conocimientos de React, TypeScript, componentes, hooks, validaciones y consumo de una API REST.

También se comprendió la importancia de mantener actualizada la información de los equipos y almacenar los préstamos para conservar los datos después de actualizar la página.

## Pruebas del sistema

Se realizaron pruebas de inventario, registro de préstamos,
validación de formularios, devolución de equipos, fechas
vencidas y persistencia de datos.

El detalle de las pruebas se encuentra en el archivo
[PRUEBAS.md](PRUEBAS.md).