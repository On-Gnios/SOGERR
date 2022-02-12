import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FrasesDeMotivacionService {

  FRASES = [
    "El poder de la imaginación nos hace infinitos",
    "Sueña en grande y atrévete a fallar",
    "No puedes vencer a alguien que nunca se rinde",
    "Las oportunidades no pasan, las creas",
    "He fallado una y otra vez y es por ello que he tenido éxito",
    "Si puedes soñarlo, puedes hacerlo",
    "Si crees que puedes, ya estás a medio camino",
    "Elige un trabajo que te guste y no tendrás que trabajar ni un día de tu vida",
    "La motivación nos impulsa a comenzar y el hábito nos permite continuar",
    "Un hombre con una nueva idea es un loco, hasta que ésta triunfa",
    "La cosa no va de tener ideas, es de hacer que sucedan",
    "Mucha gente tiene ideas pero solo unos pocos deciden llevarlas a cabo hoy y no mañana",
    "Si trabajas en algo que te gusta y te apasiona no necesitas tener un plan maestro de cómo hacer las cosas, sucederán",
    "Cuando todo parezca ir en contra tuyo, recuerda que el avión despega con el viento en contra, no a favor",
    "No importa lo lento que vayas mientras no te pares",
    "No hay nada malo en una empresa pequeña. Puedes hacer grandes cosas con un equipo pequeño",
    "A nadie le van a importar tus fracasos, ni a ti deberían importarte. Lo único que importa en los negocios es acertar una sola vez y entonces todos te dirán cuan afortunado eres",
    "Si quieres hacerlo, hazlo ahora, sino, te arrepentirás",
    "Hay muchas razones por las que empezar una empresa, pero solo una buena, una legítima: cambiar el mundo",
    "El precio del éxito es trabajo duro, dedicación y determinación en que, ganes o pierdas, habrás hecho todo lo que estaba en tus manos",
    "Si no eres una persona a la que le guste arriesgar, deberías sacar tu culo del mundo de los negocios",
    "Observa, escucha y aprende. Tú no puedes saberlo todo por ti mismo. Cualquiera que piense eso está destinado a la mediocridad",
    "El éxito para contratar a las personas adecuadas es este; busca gente que quiera cambiar el mundo",
    "Entrega siempre más de lo que se espera de ti",
    "En 20 años estarás más decepcionado por las cosas que no hiciste que por aquellas que hiciste, así que suelta amarras y navega fuera de puertos seguros",
    "No debes centrarte en porqué no puedes hacer algo, eso lo hace todo el mundo. Céntrate en  conseguirlo y convertirte en la excepción",
    "Una persona que nunca se ha equivocado es porque nunca ha probado nada nuevo",
    "Estoy convencido de que lo único que separa a los emprendedores con éxito de los que han fracasado es la perseverancia",
    "La forma de emprender algo es dejando de hablar de ello y empezar a hacerlo",
    "Mi mejor consejo para emprendedores es este: olvídate de los errores que comenterás, simplemente hazlo",
    "No podemos resolver nuestros problemas con la misma forma de pensar que usábamos cuando los creamos",
    "No te avergüences de tus fracasos, aprende de ellos y empieza de nuevo",
    "Si no sabes qué hacer con tu vida, haz algo para salvar vidas. El mundo está lleno de gente necesitada",
    "Si puedes soñarlo, puedes hacerlo",
    "»Algún día» son palabras que llevaran tus sueños a la tumba contigo. Las estrellas nunca se van a alinear igual que los semáforos nunca se ponen verdes al mismo tiempo. Las condiciones no son nunca perfectas, simplemente hazlo y ves corrigiendo las cosas por el camino",
    "Tus clientes más insatisfechos son tu mejor fuente de aprendizaje",
    "No he fallado, solo he encontrado 10.000 caminos que no funcionaban",
    "El pensamiento positivo te permitirá hacerlo todo mucho mejor que el pensamiento negativo",
    "Cualquier cosa que la mente pueda concebir o creer, la mente lo puede conseguir",
    "Puedo aceptar el fracaso, todos fracasamos en algo. Pero no puedo aceptar el no haberlo intentado",
    "En toda historia de éxito encontrarás a alguien que tomó una decisión valiente"
    ];
  constructor() { }

  getFrase(){
    return this.FRASES[Math.floor(Math.random() * this.FRASES.length)]
  }

  
}
