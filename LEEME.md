# SISTEMA VIEJA ESCUELA PARA FOUNDRY VTT

Sistema para Foundry VTT que permite jugar con partidas basadas en Vieja Escuela JdR y varios de sus sabores adicionales (Pulp!, Cyberpunk, Peplum, etc.)

## INTRODUCCIÓN

El sistema actual proporciona principalmente la hoja de personaje, por lo que el Árbitro todabía tendrá que hacer algo de trabajo dándo de alta los talentos, equipo, conjuros y monstruos específicos de su campaña.

Vieja Escuela JdR es un reglamento sencillo de libre distribución nacido al calor del Fanzine del mismo nombre. Desde su publicación inicial, se ha utilizado como base para crear un gran número de variantes. Todo el contenido relacionado con este sistema puede consultarse y descargarse libremente desde la siguiente página web:

https://skarfester.blogspot.com/2018/12/vieja-escuela-el-juego-de-rol.html

## INSTALACIÓN

Para instalar y usar el sistema Vieja Escuela JdR en Foundry Virtual Tabletop, simplemente pegue la siguiente URL en el cuadro de diálogo **Install System** del menú Configuración:

https://github.com/fragarco/vieja-escuela/blob/main/system.json

Si desea instalar manualmente el sistema, debe clonarlo o extraerlo en la carpeta "Data/systems/vieja-escuela".

## CONFIGURACIÓN

Para cada mundo creado a partir del sistema "vieja-escuela", es posible configurar el "sabor" a utilizar para la hoja de personaje. Para ello hay que lanzar el mundo en cuestión y seleccionar el sabor desde **Configurar ajustes** -> **Ajustes del sistema**.

## COMENTARIOS FINALES

### Cálculo de la Defensa

Aunque se han implementado algunas automatizaciones, varios valores deben introducirse a mano (valor de Instintos, Ataque base o Defensa). Se ha hecho a propósito, ya que la mayoría de valores pueden verse sujetos a modificaciones por equipo especial, conjuros, talentos, etc., y se ha preferido que el sistema sea funcional antes que ofrecer una ayuda muy automatizada pero que no cubra todos los casos posibles.

El valor de Defensa en un buen ejemplo de ello. La ficha proporciona dos valores, uno editable y uno calculado. El manual debería corresponder a la Defensa base (normalmente 10) más el modificador de Destreza, mientras que el calculado sumará al valor anterior los objetos de tipo "armor" utilizadas por el personaje.

### Vehículos

Actualmente el sistema no ofrece una ficha para vehículos. En el caso de los sabores que incluyen esta opción (como Cyberpunk o Vieja Estrella), se recomienda utilizar simplemente una ayuda de juego corriente con los datos del vehículo en cuestión.

## LICENCIA

Todo el código (HTML / CSS / JavaScript) de este repositorio se publica bajo la licencia GPLv3 (consultar el archivo LICENCIA para más detalles sobre la licencia).

El contenido específico del juego, como los atributos de los personajes, las características de los monstruos o las descripciones de los hechizos; se designa como "open game" según lo descrito por la Licencia OGL v1.0a (consultar el archivo OGL.txt para obtener más detalles). El nombre "Vieja Escuela" se designa como "Product Identity" y está amparado por la licencia CC-By-NC-SA 4.0, mientras que "vieja Escuela el juego de rol" también se designa como "Prodcut Identity" y queda amparado por la licencia CC-By- SA 4.0.
