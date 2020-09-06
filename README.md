# Lab: Devops-demo Kubernetes, Google Cloud y Jenkins



## Pre-Requisitos
1.  Cuenta de [Google Cloud](https://cloud.google.com/)
2.  Repositorio de versiones [Github](https://github.com/)
2.  Cuenta en [DockerHub](https://hub.docker.com/)


## Arquitectura

![](docs/img/Arquitectura.png)


## Paso 1: Intalación y configuración Servidor de Integración Continua

1.  Crear y seleccionar Proyecto en [Google Cloud](https://console.cloud.google.com/projectselector2/home/dashboard?organizationId=0&supportedpurview=project)
2.  Ir a [Compute Engine](https://console.cloud.google.com/compute/)
3.  Crear una Instancia con las siguientes caracteristicas como minimo:
    -   2 vCPU
    -   4 Gb Memoria RAM
    -   Sistema Operativo Centos 7
    -   Alcance del acceso: Permitir acceso completo a todas las API de cloud
    -   Permitir trafico HTTP y HTTPS
4.  Creación de corta fuegos

-   Es necesario crear un [Corta Fuegos](https://console.cloud.google.com/networking/firewalls/) el cual nos permita el uso de los diferentes puertos utilizados por nuestras instancias, en este caso nuestro servidor de integración continua necesita utilizar el puerto 8080, para fines el ejemplo habilitaremos toda la comunicación

![](docs/img/crear-firewall.PNG)

-   Asignar Regla al servidor de integración continuea, por medio de etiquetas de red
![](docs/img/asignar-regla-vpc.PNG)

5.  Intalar Herramientas
    -   [Instalar Jenkins](https://www.jenkins.io/doc/book/installing/#red-hat-centos)
    -   [Instalar Docker](https://docs.docker.com/engine/install/centos/)
    -   [Instalar Kubernetes](https://phoenixnap.com/kb/how-to-install-kubernetes-on-centos)
    -   [Instalar GitHub](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-centos-7)
    -   [Instalar NodeJS](https://www.ochobitshacenunbyte.com/2019/01/23/instalar-node-js-y-npm-en-centos-7/) v12.18.3 o superior
        - [Actualizar NodeJs a version v12.18.3](https://matthiashoys.wordpress.com/2020/01/15/how-to-upgrade-node-js-from-v6-to-v12-on-centos-linux-7/) o superior

    -   Instalar Plugins Jenkins
        -   Ir a Administrar Jenkins -> Administrar Pluging e Instalar los complementos:
            - Docker Pipeline
            - Google Kubernetes Engine

![](docs/img/jenkins-docker-pipeline.PNG)
![](docs/img/jenkins-docker-kubectl.PNG)
