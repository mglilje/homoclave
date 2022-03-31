

//referencias HTML
const btnPedir   = document.querySelector('#btnNuevo');
const resultado = document.querySelector('h1');
let nombre ='',
    apellidoPaterno ='',
    apellidoMaterno = '';
    fechaNacimiento ='';
//Funcion para quito acentos al nombre
const quitaAcentro = (txt) => {
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return txt.split('').map( letra => acentos[letra] || letra).join('').toString();	
}
//Elimina palabras Sobrantes en los nombres y apellidos
const RFCFiltraNombres = (e) => {
    const a = [".", ",", "de ", "del ", "la ", "los ", "las ", "y ", "mc ", "mac ", "von ", "van "],
        l = ["jose ", "maria ", "j ", "ma "];
    e=quitaAcentro(e);
    e = e.toLowerCase();
    for (let l in a) e = e.replace(a[l], "");
    for (let a in l) e = e.replace(l[a], "");
    switch (e.substr(0, 2)) {
        case "ch":
            e = e.replace("ch", "c");
            break;
        case "ll":
            e = e.replace("ll", "l")
    }
    return e
};
//sacamos el valor de Primer apellido
const RFCArmalo = (ap_paterno) => {   
    ap_paterno= quitaAcentro(ap_paterno.toLowerCase());
    let primerLetra =ap_paterno[0],
        regex = /[^aeiou]/gi;
        return (primerLetra+ap_paterno.replace(regex, "")[0]);       
}
//Palabras altisonantes
const RFCQuitaProhibidas = (rfc)=> {
    let res;
    strPalabras = "BUEI*BUEY*CACA*CACO*CAGA*CAGO*CAKA*CAKO*COGE*COJA*KOGE*KOJO*KAKA*KULO*MAME*MAMO*MEAR*MEAS*MEON*MION*COJE*COJI*COJO*CULO*FETO*GUEY*JOTO*KACA*KACO*KAGA*KAGO*MOCO*MULA*PEDA*PEDO*PENE*PUTA*PUTO*QULO*RATA*RUIN*";
    res = strPalabras.match(rfc);
    return (res!=null)?rfc.substr(0, 3) + 'X':rfc;
}
//calculo de hominidos
const hominidos = (aP,aM,nom)=>{
    let numeroSuma =0;
    homonimo='';
    const literales = new Map([  
        ['ñ','10'],
        ['ü','10'],
        ['a','11'],
        ['b','12'],
        ['c','13'],
        ['d','14'],
        ['e','15'],
        ['f','16'],
        ['g','17'],
        ['h','18'],
        ['i','19'],
        ['j','21'],
        ['k','22'],
        ['l','23'],
        ['m','24'],
        ['n','25'],
        ['ñ','40'],
        ['o','26'],
        ['p','27'],
        ['q','28'],
        ['r','29'],
        ['s','32'],
        ['t','33'],
        ['u','34'],
        ['v','35'],
        ['w','36'],
        ['x','37'],
        ['y','38'],
        ['z','39'],
        [' ','00'],  
     ]);
     const pHo = new Map([ 
        ['0','1'],
        ['1','2'],
        ['2','3'],
        ['3','4'],
        ['4','5'],
        ['5','6'],
        ['6','7'],
        ['7','8'],
        ['8','9'],
        ['9','A'],
        ['10','B'],
        ['11','C'],
        ['12','D'],
        ['13','E'],
        ['14','F'],
        ['15','G'],
        ['16','H'],
        ['17','I'],
        ['18','J'],
        ['19','K'],
        ['20','L'],
        ['21','M'],
        ['22','N'],
        ['23','P'],
        ['24','Q'],
        ['25','R'],
        ['26','S'],
        ['27','T'],
        ['28','U'],
        ['29','V'],
        ['30','W'],
        ['31','X'],
        ['32','Y'],
        ['33','Z'],
    ]);
    const sHo = new Map([ 
        ['0','1'],
        ['1','2'],
        ['2','3'],
        ['3','4'],
        ['4','5'],
        ['5','6'],
        ['6','7'],
        ['7','8'],
        ['8','9'],
        ['9','A'],
        ['10','B'],
        ['11','C'],
        ['12','D'],
        ['13','E'],
        ['14','F'],
        ['15','G'],
        ['16','H'],
        ['17','I'],
        ['18','J'],
        ['19','K'],
        ['20','L'],
        ['21','M'],
        ['22','N'],
        ['23','P'],
        ['24','Q'],
        ['25','R'],
        ['26','S'],
        ['27','T'],
        ['28','U'],
        ['29','V'],
        ['30','W'],
        ['31','X'],
        ['32','Y'],
        ['33','Z'],
    ]);
    let nomCompleto = aP.trim() + ' ' + aM.trim() + ' ' + nom.trim();
        suma='0';
    for(let i=0; i<nomCompleto.length;i++){
        suma = suma + literales.get(nomCompleto.substr(i, 1));
    }
    for (i = 0; i <= suma.length + 1; i++) {
        numero1 = suma.substr(i, 2);
        numero2 = suma.substr(i + 1, 1);
        numeroSuma = numeroSuma + (numero1 * numero2);
    } 
    let numero3 = numeroSuma % 1000,
        numero4 = numero3 / 34,
        numero5 = numero4.toString().split(".")[0],
        numero6 = numero3 % 34;    
    
    homonimo=pHo.get(numero5);
    homonimo=homonimo+sHo.get(numero6.toString());
    // console.table({nomCompleto,suma,numero3,numero4,numero5,numero6,homonimo});
    return homonimo;
}
//calculamos el ultimo numero, digito verificador homoclave
const digitoVerificador=(rfc)=>{
    const digitoVerificador = new Map([
        ['0',00],
        ['1',01],
        ['2',02],
        ['3',03],
        ['4',04],
        ['5',05],
        ['6',06],
        ['7',07],
        ['8',08],
        ['9',09],
        ['A',10],
        ['B',11],
        ['C',12],
        ['D',13],
        ['E',14],
        ['F',15],
        ['G',16],
        ['H',17],
        ['I',18],
        ['J',19],
        ['K',20],
        ['L',21],
        ['M',22],
        ['N',23],
        ['&',24],
        ['O',25],
        ['P',26],
        ['Q',27],
        ['R',28],
        ['S',29],
        ['T',30],
        ['U',31],
        ['V',32],
        ['W',33],
        ['X',34],
        ['Y',35],
        ['Z',36],
        [' ',37],
        ['Ñ',38],
    ]);
    let nv=0;
        arrRFC=rfc.split('');
        y=13;
        for (let i = 0; i < arrRFC.length; i++) {            
            nv = nv + (digitoVerificador.get(arrRFC[i]) * y);
            y--;
        }
        nv = nv % 11;
        //alert(nv);
        rfc =   (nv===0)?rfc+nv:
                (nv<10)?rfc+(11-nv):rfc+'A';

        // if (nv === 0) {
        //     rfc = rfc + nv;
        // } 
        // else if (nv <= 10) {
        //     nv = 11 - nv;
        //     if (nv == '10') {
        //         nv = 'A';
        //     }
        //     rfc = rfc + nv;
        // } else if (nv == '10') {
        //     nv = 'A';
        //     rfc = rfc + nv;
        // }
        return rfc
}
//Eventos
btnPedir.addEventListener('click', () => {
    let rfcPrimerBloque = '';
        hom='';
        rfc='';
    nombre =document.querySelector('#nombre').value,
    apellidoPaterno =document.querySelector('#apellidoPaterno').value,
    apellidoMaterno = document.querySelector('#apellidoMaterno').value;
    fechaNacimiento =document.querySelector('#bday').value;
    nombreLimpio = RFCFiltraNombres(nombre);

    rfcPrimerBloque=(RFCArmalo(apellidoPaterno)+apellidoMaterno[0]+nombreLimpio[0]).toLocaleUpperCase();
    rfcPrimerBloque=RFCQuitaProhibidas(rfcPrimerBloque);
    hom=hominidos(apellidoPaterno.toLowerCase(),apellidoMaterno.toLowerCase(),nombre.toLowerCase());
    editfecha=(fechaNacimiento.replaceAll('-','')).slice(2);
    
    rfc=rfcPrimerBloque+editfecha+hom;
    // return digitoVerificador(rfc);
    resultado.innerText=digitoVerificador(rfc);
});