# Api con Node.js y express

- Para inicializar un proyecto con node.js se usa **npm init -y**
- Para descargar algun paquete  o descargar los paquetes que ya esten inicializados en el json que necesites se usa **npm install**
- Para iniciar el proyecto se usa **npm start**

## Iniciando Proyecto

Dentro del directorio de nuestro proyecto ingresamos el siguiente comando para iniciar el proyecto de node.js:

```txt
npm init -y
```

Instalamos Express en nuestro proyecto con el comando:

```txt
npm i express --save
```

Hay otros paquetes que necesitamos inicialmente, por lo que usamos el siguiente comando (`-S` guarda las dependencias de la misma manera que `--save`, si deseas que se guarde como una dependecia de desarolllo `npm i -D <paquete>` o `npm install --save-dev <paquete>`):

```txt
npm i cors dotenv multer express nodemon pg pg-pool -S
```

- `cors`: Cross Origin Resources Sharing, nos permite restringir los recursos de nuestra aplicación, que pueden ser requeridas por otro dominio.
- `dotenv`: Manejo de variables de entorno
- `multer`: Ayuda el manejo de carga de archivos y almacenamiento
- `express`: Se utiliza para crear aplicaciones web de todo tipo, desde simples APIs REST hasta aplicaciones web completas con enrutamiento, middleware y plantillas.
- `nodemon`: reinicia automáticamente el servidor Node.js cuando detecta cambios en los archivos del proyecto.

```
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```
**npm run dev**

