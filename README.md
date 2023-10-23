
# Proyecto base de automatización con playwright
 ## proyecto-base-playwright-pom-bdd

## Description
Este proyecto busca dejar un arquetipo base para empezar a utilizar en un patron POM

## ✅ Tecnologías
### Este proyecto usa las siguientes técnologías:
- Node.js V 16+
- Windows 10+
- Visual Studio Code

Tambien se requiere la instalación del plugin de:
Playwright Test for VSCode
El cual facilita la interacción con los test y nos da una visual más amplia

Crear la carpeta inicial donde se llevara a cabo la demostración
## Instalación
Para instalar Playwright basta con ejecutar el comando de instalación:

```
npm init playwright@latest
```

- Despues elegir entre TypeScript o JavaScript (por defecto es TypeScript)
- Nombre de la carpeta Tests (por defecto es tests o e2e si ya tienes una carpeta tests en tu proyecto)
- Añada un flujo de trabajo de Acciones de GitHub para ejecutar fácilmente pruebas en CI (Por ahora no se usaran: false)
- Instalar navegadores Playwright (por defecto es true)

## 📁 Explicación Carpetas

- playwright-config.ts
Esta carpeta trae todas las configuraciones que se pueden realizar en Playwright, por ej: Directorio de los tests, configurar en los reportes los videos y imagenes que se requieren, configurar una url por defecto, configurar los navegadores, etc

- package.json

Nos explica las versiones que se estan utilizando en el proyecto
el autor, la descripción, etc lo normal de un package.json




##  🛠️ Run tests
```
npx playwright test 
```
Para correr todos los tests configigurados
```
npx playwright test example
```
Para correr todos los tests en una ubicación precisa
```
npx playwright test --debug
```
Para correr los test en modo debug

```
npx playwright show-report
```
Para lanzar un servidor y ver los diferentes reportes

##  💹 Reportes con allure

Para integrar el framework de reportes de allure con los test de playwright se debe hacer lo siguiente:

###Instalar scoop

Basta con escribir los comandos en powershell
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
```
irm get.scoop.sh | iex
```

Con esto tendremos instaldo scoop

### Instalar allure
Ejecutamos el comando:
```
scoop install allure
```

Y ya en nuestro proyecto instalamos la dependencia:
```
npm i -D @playwright/test allure-playwright
```


###Correr el reporte allure

para que se puedan observar los reportes con allure se debe ejecutar:
```
allure generate allure-results
```
Para abrir el reporte en un servidor local se usa:
```
allure open allure-report
```
## Authors and acknowledgment
| [<img src="https://gitlab.com/uploads/-/system/user/avatar/15033064/avatar.png?width=400" width=115><br><sub>Cristian F. Roa C.</sub>](https://gitlab.com/cristian.roa) <br/> 

| [<img src="https://secure.gravatar.com/avatar/0f2f8d1bc9ccb1c4e5775b2edfcbd71e?s=800&d=identicon" width=115><br><sub>Cristian C. Lopez</sub>](https://gitlab.com/clopezm) <br/> 


## License
Open source project.



