# VIEJA ESCUELA FOUNDRY VTT SYSTEM

Foundry VTT system for playing Vieja Escuela el Juego de Rol (Vieja Escuela JdR).

## INTRODUCTION

The current system primarily provides the character sheet, so the Referee will still have to do some work enlisting specific talents, equipment, spells, and monsters for his campaign.

Vieja Escuela JdR is a free and simple ruleset born from the pages of a Fanzine of the same name. Since its initial publication, it has been used as the basis for a large number of variants and hacks. All content related to this system can be freely consulted and downloaded from the following website:

https://skarfester.blogspot.com/2018/12/vieja-escuela-el-juego-de-rol.html

## INSTALLATION

To install and use the Vieja Escuela JdR system for Foundry Virtual Tabletop, simply paste the following URL into the **Install System** dialog on the Setup menu of the application.

https://github.com/fragarco/vieja-escuela/blob/main/system.json

If you wish to manually install the system, you must clone or extract it into the ``Data/systems/vieja-escuela`` folder.

## SETTINGS

For each world created using the Vieja Escuela JdR system, it is possible to configure the "flavor" (hack) to use in its character sheet. To do this, you have to launch the world in question and select the flavor from **System Configuration** -> **System Settings**.

## FINAL REMARKS

Although some automations have been implemented, several values must be entered by hand (Instincts, Base Attack, or Defense). It has been done on purpose, since most values can be subject to modifications by special equipment, spells, talents, etc., and its better to have a functional system rather than offering a very automated tool that does not cover all the possible cases.

The Defense value is a good example of this. The sheet provides two values, one editable and one calculated. The manual value should correspond to the base Defense (normally 10) plus the Dexterity modifier, while the calculated one will add to the previous value the "armor" type objects used by the character.

## LICENSE

All of the code (HTML/CSS/JavaScript) in this repository is released under the GPLv3 license (see LICENSE file for details).

Game content like character attributes, monsters characteristics, spells descriptions, and rules information is designated as Open Game Content as descrived by the Open Game License 1.0a (see OGL.txt file for details). The name "Vieja Escuela" is designated as Product Identity and covered by the license CC-By-NC-SA 4.0, while "vieja Escuela el juego de rol" is designate as Product Identity too, and covered by the license CC-By-SA 4.0.
