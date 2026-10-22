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
- Manejo de errores de conexión con opción de reintentar.

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- Git (para clonar el repositorio)

## Instalación

**1. Clonar el repositorio:**

```bash
git clone https://github.com/abarriosp6-crypto/prestamos-lab.git
```

**2. Ingresar a la carpeta del proyecto:**

```bash
cd prestamos-lab
```

**3. Instalar las dependencias:**

```bash
npm install
```

## Configuración de variables de entorno

Antes de ejecutar la aplicación, es necesario crear un archivo llamado `.env` en la raíz del proyecto, al mismo nivel que `package.json` y `db.json`.

Dentro del archivo se debe agregar:

```env
VITE_API_URL=http://localhost:3003
```

Esta variable permite que la aplicación React se comunique con JSON Server mediante el puerto 3003.

El archivo `.env` no se incluye en el repositorio porque está configurado en `.gitignore`, por lo que cada persona que descargue el proyecto debe crearlo.

## Ejecución del proyecto

Es necesario utilizar dos terminales abiertas en la carpeta del proyecto.

### Terminal 1: Servidor de datos

Ejecutar:

```bash
npx json-server ./db.json --port 3003
```

La API estará disponible en:

- http://localhost:3003/equipos
- http://localhost:3003/prestamos

### Terminal 2: Aplicación React

Ejecutar:

```bash
npm run dev
```

Abrir en el navegador:

http://localhost:5173

**Importante:** ambos servidores deben permanecer ejecutándose para utilizar todas las funcionalidades del sistema.

## Estructura del proyecto

- `src/components/`: componentes de la interfaz.
- `src/pages/`: pantalla de préstamos activos.
- `src/hooks/`: lógica reutilizable de React.
- `src/services/`: comunicación con la API.
- `src/types/`: interfaces de TypeScript.
- `src/App.tsx`: componente principal.
- `db.json`: almacenamiento de equipos y préstamos.
- `README.md`: documentación general del proyecto.
- `PRUEBAS.md`: descripción de las pruebas funcionales realizadas.

## Pruebas del sistema

Se realizaron pruebas de inventario, búsqueda, filtros, registro de préstamos, validación de formularios, devolución de equipos, fechas vencidas, persistencia de datos y manejo de errores de conexión.

El detalle de las pruebas se encuentra en el archivo [PRUEBAS.md](PRUEBAS.md).

## Conclusión

Con el desarrollo de este proyecto se pusieron en práctica conocimientos de React, TypeScript, componentes, hooks, validaciones y consumo de una API REST.

También se comprendió la importancia de mantener actualizada la información de los equipos y almacenar los préstamos para conservar los datos después de actualizar la página.