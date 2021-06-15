# Bot de Cuentas

Bot creado para llevar las cuentas personales y/o grupales.


## Funcionamiento

El bot almacena los datos a través de mensajes que le enviamos. La idea es que sea algo simple, rápido y que esté siempre al alcance de la mano.

## Comandos

Prefijo antes de los comandos **/g**
- **_n_ Descripción**: Suma un nuevo gasto
  - n tiene que ser pósitivo para sumar un gasto o negativo para restarlo.
- **total _1 1_**: Muestra total gastado en un intervalo de tiempo.
  - Los números indican el intervalo de meses para mostrar el total. En el caso de ingresar un solo valor suma el total de ese més hasta la fecha actual.
  - El segundo número excluye ese mes.
  - _Ejemplos_: 
    - **/g total 4 5** -> muestra el total del mes 4 hasta el principio del mes 5.
    - **/g total 4** -> muestra el total desde el mes 4 hasta el día de hoy.
- **list _1 1_**: Muestra una lista descriptiva de los gastos en un intervalo de tiempo.
  - Los números indican el intervalo de meses para mostrar el total. En el caso de ingresar un solo valor suma el total de ese més hasta la fecha actual.
  - El segundo número excluye ese mes.
  - _Ejemplos_: 
    - **/g total 4 5** -> muestra una lista descriptiva de los gastos del mes 4 hasta el principio del mes 5.
    - **/g total 4** -> muestra una lista descriptiva de los gastos desde el mes 4 hasta el día de hoy.

### Dependencias

- [moment.js](https://momentjs.com/)
- [node-telegram-got-api](https://github.com/yagop/node-telegram-bot-api)
- [sqlite3](https://www.sqlitetutorial.net/sqlite-nodejs/)

### Versiones 

```
node: 16.2.0
nvm: 0.38.0
npm: 7.13.0
```

### Roadmap

- [ ] Deploy en servidor para uso público.
- [x] Feedback al cargar algun dato.
- [ ] Mejorar el feedback de stats.
- [ ] Funcionalidad para exportar datos a Google Sheets y/o archivo csv.
- [ ] Funcionalidad para enviar notificaciones generales a todos los chats que esten usando el bot
  - Solo será usado en el caso de tener que hacer mantenimiento o cambios en el servidor.


### Creadores 

[Ann Diehl](https://github.com/kotorigadaisuki)

[Ale Piumetti](https://github.com/alepiumetti)

	
