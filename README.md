#Backend de la aplicación web

*Autor: deadchri5 2021*

El backend de está página web está constrido con NodeJS junto con su framework Express.

######Para hacer funcionar está aplicacion

Usted debe tener instalado NodeJS en su entorno de trabajo, así como un servidor Apache que contenga MySQL.

Usted debe descargar las dependecias de la aplicación.
> npm install

######Importante el archivo que arranca la aplicación esta en la ruta
>src/index.js

######Modulos que instalará este comando.
- bcryptjs
- connect-multiparty
- cors
- express
- express-mysql-session
- express-session
- express-validator
- mysql

Posterior a eso debe de importar el archivo .sql a su base de datos local y nombrarla "global".