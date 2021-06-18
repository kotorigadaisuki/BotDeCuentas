# Hola! Soy Apolo 🐶 

Fui creado para ayudarte a gestionar tus finanzas. 

Actualmente estoy en desarrollo, pero espero que mis creadores sigan agregandome funcionalidades continuamente.

## Mi funcionamiento

Almaceno los datos a través de mensajes que me envían. La idea es que sea algo simple, rápido y que esté siempre al alcance de tu mano.

## Mis comandos

Para que te escuche debe poner **/g** antes de mis comandos
- **_n_ Descripción**: Sumo un nuevo gasto
  - n tiene que ser pósitivo para poder sumar un gasto o negativo para restarlo.
- **total _1 1_**: Muestro el total gastado en un intervalo de tiempo.
  - Los números indican el intervalo de meses para mostrar el total. En el caso de ingresar un solo valor sumo el total de ese més hasta la fecha actual.
  - El segundo número excluye ese mes.
  - _Ejemplos_: 
    - **/g total 4 5** -> muestra el total del mes 4 hasta el principio del mes 5.
    - **/g total 4** -> muestra el total desde el mes 4 hasta el día de hoy.
- **list _1 1_**: Muestro una lista descriptiva de los gastos en un intervalo de tiempo.
  - Los números indican el intervalo de meses para mostrar el total. En el caso de ingresar un solo valor sumo el total de ese més hasta la fecha actual.
  - El segundo número excluye ese mes.
  - _Ejemplos_: 
    - **/g total 4 5** -> muestra una lista descriptiva de los gastos del mes 4 hasta el principio del mes 5.
    - **/g total 4** -> muestra una lista descriptiva de los gastos desde el mes 4 hasta el día de hoy.
- **help**: Muestro todos los comandos disponibles.
- **about**: Muestro toda la información relacionada a mi.

### Dependo de:

- [moment.js](https://momentjs.com/)
- [node-telegram-got-api](https://github.com/yagop/node-telegram-bot-api)
- [sqlite3](https://www.sqlitetutorial.net/sqlite-nodejs/)

### Versiones en las que fui creado 

```
node: 16.2.0
nvm: 0.38.0
npm: 7.13.0
```

### Roadmap

- [x] Deploy en servidor para uso público.
- [x] Feedback al cargar algun dato.
- [x] Mejorar el feedback de stats.
- [ ] Funcionalidad para exportar datos a Google Sheets y/o archivo csv.
- [x] Funcionalidad para enviar notificaciones generales a todos los chats que esten usando el bot
  - Solo será usado en el caso de tener que hacer mantenimiento o cambios en el servidor.


### Mis creadores 

[Ann Diehl](https://github.com/kotorigadaisuki)

[Ale Piumetti](https://github.com/alepiumetti)

	
