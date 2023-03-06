
import * as THREE from './three.js-master/build/three.module.js'
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {ColladaLoader} from './three.js-master/examples/jsm/loaders/ColladaLoader.js'
import {OBJLoader} from './three.js-master/examples/jsm/loaders/OBJLoader.js'
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'

class Main {
    constructor(){
        this.initAritubutos()
        this.initMateriales()
        this.initEscena()
        this.initCamara()
        this.initObjetos()
    }
    initAritubutos(){
        this.escena=null
        this.camarap=null
        this.camarao=null
        this.renderizador=null
        this.controlcamara=null
        this.color={}
        this.caja={}
        this.malla={}
        this.gmtr={}
        this.textura={}
        this.fongo={}
        this.luz={}
        this.leon=new THREE.Group()
        this.rubio=new THREE.Group()
        this.brujo=new THREE.Group()
        this.alien=new THREE.Group()
        this.cyborg=new THREE.Group()
        this.criper=new THREE.Group()
        this.aspecto=window.innerWidth / window.innerHeight
    }
    initMateriales(){
        this.color[0]=new THREE.MeshBasicMaterial({color:"black"})
        this.color[1]=new THREE.MeshBasicMaterial({color:"white"})
        this.color[2]=new THREE.MeshBasicMaterial({color:"green"})
        this.color[3]=new THREE.MeshBasicMaterial({color:"green", wireframe:true})
        this.color[4]=new THREE.MeshBasicMaterial({color:"gold"})
        //formas
        this.gmtr[0]=new THREE.BoxGeometry(2,2,2)
        this.gmtr[3]=new THREE.BoxGeometry(10,10,10)
        this.gmtr[1]=new THREE.SphereGeometry(2,10,10)
        this.gmtr[2]=new THREE.PlaneGeometry(40,40)
        //texturas
        const textura1=new THREE.TextureLoader().load('texturas/brick_roughness.jpg')
        const textura2=new THREE.TextureLoader().load('texturas/caja.gif')
        const textura3=new THREE.TextureLoader().load('texturas/ladrillos.jpg')
        const textura4=new THREE.TextureLoader().load('texturas/madera.jpg')
        const textura5=new THREE.TextureLoader().load('texturas/suelo-natural.jpg')
        const textura6=new THREE.TextureLoader().load('texturas/suelo-seco.jpg')        
        this.textura["roca"]=new THREE.MeshBasicMaterial( { map: textura1 } )
        this.textura["caja"]=new THREE.MeshBasicMaterial( { map: textura2 } )
        this.textura["ladrillo"]=new THREE.MeshBasicMaterial( { map: textura3} )
        this.textura["madera"]=new THREE.MeshBasicMaterial( { map: textura4 } )
        this.textura["tierra"]=new THREE.MeshBasicMaterial( { map: textura5 } )
        this.textura["arena"]=new THREE.MeshBasicMaterial( { map: textura6 } )
        //texturas sensibles a la luz
        this.fongo["roca"]=new THREE.MeshPhongMaterial( { map: textura1 } )
        this.fongo["caja"]=new THREE.MeshPhongMaterial( { map: textura2 } )
        this.fongo["ladrillo"]=new THREE.MeshPhongMaterial( { map: textura3} )
        this.fongo["madera"]=new THREE.MeshPhongMaterial( { map: textura4 } )
        this.fongo["tierra"]=new THREE.MeshPhongMaterial( { map: textura5 } )
        this.fongo["arena"]=new THREE.MeshPhongMaterial( { map: textura6 } )
        //luces
        this.luz[0]=new THREE.PointLight(this.color[1])
        this.luz[1]=new THREE.AmbientLight(this.color[4])
        //mallas de poligonos
        this.malla["cubo"]=new THREE.Mesh(this.gmtr[3], this.fongo["ladrillo"])
        this.malla["cubo2"]=new THREE.Mesh(this.gmtr[0], this.fongo["caja"])
        this.malla["bola"]=new THREE.Mesh(this.gmtr[1], this.fongo["tierra"])        
        this.malla["plano"]=new THREE.Mesh(this.gmtr[2],this.fongo["madera"])
        //modelos prediseñados
        this.malla["Creeper"] = new GLTFLoader().load('modelo/Creeper.glb',(glb2)=>{
            console.log(glb2)
            this.criper.add(glb2.scene)
            this.escena.add(this.criper)            
        });
        this.malla["Alien"] = new GLTFLoader().load('modelo/Morphing.gltf',(gltf)=>{
            console.log(gltf)
            this.alien.add(gltf.scene)
            this.escena.add(this.alien)            
        });
        this.malla["leon"] = new ColladaLoader().load('modelo/Lynel.dae',(dae1)=>{
            console.log(dae1)
            this.leon.add(dae1.scene)
            this.escena.add(this.leon)
        });
        this.malla["Rodin"] = new ColladaLoader().load('modelo/Rodin/rodin.dae',(dae2)=>{
            console.log(dae2)
            this.brujo.add(dae2.scene)
            this.escena.add(this.brujo)
        });        
        this.malla["Claudio"] = new ColladaLoader().load('modelo/Cloud/Cloud.dae',(dae3)=>{
            console.log(dae3)
            this.rubio.add(dae3.scene)
            this.escena.add(this.rubio)
        });
        this.malla["Gray Fox"] = new ColladaLoader().load('modelo/Gray Fox/cyborg.dae',(dae4)=>{
            console.log(dae4)
            this.cyborg.add(dae4.scene)
            this.escena.add(this.cyborg)
        });
    }    
    initEscena(){
        this.escena=new THREE.Scene()
    }
    initCamara(){
        this.camarap=new THREE.PerspectiveCamera(
            100, this.aspecto, 0.1, 1000
        );
        this.camarao=new THREE.OrthographicCamera(
            -window.innerWidth/2 ,window.innerWidth/2 ,
            window.innerHeight/2, -window.innerHeight/2,
            1,1000
        );
        this.renderizador=new THREE.WebGLRenderer()
        this.renderizador.setSize(window.window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderizador.domElement)

        //interactividad
        this.rbtcntrls=new OrbitControls(this.camarap, this.renderizador.domElement)
        this.rbtcntrls.autoRotate=true
        this.rbtcntrls.enableDamping=true
        this.rbtcntrls.dampingFactor=0.05
        this.rbtcntrls.minDistance=10
        this.rbtcntrls.maxDistance=35
        this.rbtcntrls.listenToKeyEvents( window )
        this.camarap.position.set(-2,5,13)		
    }
    initObjetos(){
        this.escena.add(this.malla["plano"])
        this.malla["plano"].position.set(0,-1,0)
        this.malla["plano"].rotateX(3*Math.PI/2)
        this.escena.add(this.luz[0])
        this.escena.add(this.luz[1])
        this.alien.position.set(0,3,10)
        this.alien.rotateY(3*Math.PI/2)
        this.leon.position.set(-4,0,-7)
        this.escalar(this.rubio,10,10,10)
        this.rubio.rotateX(Math.PI/2)
        this.rubio.position.set(4,0,-7)
        this.escalar(this.brujo,10,10,10)
        this.brujo.rotateX(Math.PI/2)
        this.brujo.position.set(4,0,7)
        this.escalar(this.cyborg,10,10,10)
        this.cyborg.rotateX(Math.PI/2)
        this.cyborg.position.set(-4,0,7)
        this.criper.position.set(0,4,0)
        this.escalar(this.criper,1.5,1.5,1.5)
        this.luz[0].position.y=20
        this.luz[1].position.y=20
    }
    escalar(mlldplgns,x,y,z){
        mlldplgns.scale.x=x
        mlldplgns.scale.y=y
        mlldplgns.scale.z=z
    }
    animar(){
        requestAnimationFrame(()=>{this.animar()})
        this.renderizador.render(this.escena, this.camarap)
        this.rbtcntrls.update()
    }

}
new Main().animar()