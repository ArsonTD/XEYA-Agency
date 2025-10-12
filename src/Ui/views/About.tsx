import { Code2, Smartphone, Workflow, Database, Palette, Layers, Lightbulb, Shield, Zap, Target, Users, CheckCircle2, ArrowRight, Mail} from "lucide-react"
import { ParticleBackground } from "@/Ui/components/AnimatedBackground"
import  Button  from "@/Ui/components/Button"

const services = [
    {
      icon: Code2,
      title: "Desarrollo Web",
      description: "Plataformas web modernas con React, Next.js y las últimas tecnologías",
    },
    {
      icon: Smartphone,
      title: "Apps Móviles",
      description: "Aplicaciones nativas y multiplataforma para iOS y Android",
    },
    {
      icon: Palette,
      title: "Diseño Gráfico",
      description: "Identidad visual, branding y diseño de materiales que comunican tu marca",
    },
    {
      icon: Layers,
      title: "UI/UX Design",
      description: "Interfaces intuitivas y experiencias de usuario que convierten y deleitan",
    },
    {
      icon: Workflow,
      title: "Automatización",
      description: "Sistemas inteligentes que optimizan procesos y aumentan productividad",
    },
    {
      icon: Database,
      title: "Backend & APIs",
      description: "Arquitecturas escalables con Node.js, .NET y bases de datos robustas",
    },
]

const values = [
{
    icon: Lightbulb,
    title: "Innovación constante",
    description: "Siempre explorando nuevas tecnologías y metodologías",
},
{
    icon: Shield,
    title: "Transparencia",
    description: "Comunicación clara y honesta en cada etapa del proyecto",
},
{
    icon: Zap,
    title: "Desarrollo ágil",
    description: "Entregas rápidas con metodologías colaborativas",
},
{
    icon: Target,
    title: "Calidad superior",
    description: "Código limpio, testeado y mantenible",
},
]

const reasons = [
"Trabajamos como parte de tu equipo, no como un proveedor externo",
"Entendemos tu negocio y hablamos tu idioma",
"Entregamos software que realmente cumple objetivos medibles",
"Metodología ágil con entregas continuas y feedback constante",
"Soporte técnico y mantenimiento post-lanzamiento",
]
  

export default function About() {

  return (
    <>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center bg-primary text-primary-foreground overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px, transparent_1px), linear-gradient(to_bottom,
            #ffffff08_1px, transparent_1px)] bg-[size:4rem_4rem]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-sans mb-4">
                        Fundada en 2025
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
                        Innovacion que transforma negocios
                    </h1>

                    <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto text-pretty leading-relaxed font-sans">
                        Somos una startup especializada en desarrollo de software y diseño gráfico, creando soluciones digitales
                        completas que impulsan el crecimiento empresarial
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center pt-4">
                        <div className="px-6 py-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                            <div className="text-3xl font-bold">50+</div>
                            <div className="text-sm text-primary-foreground/70">Proyectos</div>
                        </div>

                        <div className="px-6 py-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                            <div className="text-3xl font-bold">30+</div>
                            <div className="text-sm text-primary-foreground/70">Clientes</div>
                        </div>

                        <div className="px-6 py-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                            <div className="text-3xl font-bold">100%</div>
                            <div className="text-sm text-primary-foreground/70">Satisfacción</div>
                        </div>
                    </div>    
                </div>
            </div>
            {/* Scroll indicator*/}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-primary-foreground/50 rounded-full"/>
                </div>
            </div>
        </section>

        {/* MISSION SECTION */}
        <section className="relative py-24 md:py-32 bg-background">
            <ParticleBackground />
            <div className="max-w-5xl mx-auto container mx-auto px-6">
                <div className="max-2-4xl mx-auto">
                    <div className="inline-block px-4 py-1 bg-muted rounded-full text-sm font-mono mb-6 text-muted-foreground">
                        01 / Misión
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
                        Nuestra misión es innovar la trasnformacion digital
                    </h2>

                    <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                        Desarrollamos software inteligente y diseñamos experiencias visuales impactantes que resuelven problemas
                        reales. Creemos que la tecnología y el diseño deben trabajar juntos para crear soluciones accesibles,
                        eficientes y centradas en el usuario que impulsan el éxito de nuestros clientes.
                    </p>
                </div>
            </div>
        </section>

        {/* VISION SECTION */}
        <section className="relative py-24 md:py-32 bg-background">
            <ParticleBackground />
            <div className="max-w-5xl mx-auto container mx-auto px-6">
                <div className="max-2-4xl mx-auto">
                    <div className="inline-block px-4 py-1 bg-muted rounded-full text-sm font-mono mb-6 text-muted-foreground">
                        02 / Visión
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
                        Convertirnos en referentes de innovación tecnológica y diseño
                    </h2>

                    <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                        Aspiramos a ser referentes en Latinoamérica, creando herramientas y diseños que impulsen negocios más eficientes, sostenibles y preparados para el futuro digital. 
                        Queremos ser el aliado estratégico de confianza para las empresas que buscan crecer y transformarse a través de la innovación.
                    </p>
                </div>
            </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="relative py-24 md:py-32 bg-background overflow-hidden">
            <ParticleBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="inline-block px-4 py-1 bg-muted rounded-full text-sm font-mono mb-6 text-muted-foreground">
                        03 / Que hacemos
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
                        Soluciones tecnológicas y de diseño a medida
                    </h2>

                    <p className="text-xl text-muted-foreground mb-16 max-w-4xl leading-relaxed">
                        Desarrollamos software personalizado y creamos diseños impactantes para startups, PYMEs y grandes empresas.
                        Nos especializamos en tecnologías modernas y diseño centrado en el usuario que garantizan escalabilidad y
                        resultados.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={index}
                                className="group p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center mb-6 group-hover:bg-primary/20">
                                    <service.icon className="w-6 h-6 text-primary ml-3" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="inline-block px-4 py-1 bg-primary-foreground/10 rounded-full text-sm font-mono mb-6">
                        04 / Valores
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-balance">Principios que nos guían</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="space-y-4">
                                <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                                <value.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold">{value.title}</h3>
                                <p className="text-primary-foreground/70 leading-relaxed text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* TEAM SECTION */}
        <section className="relative py-24 md:py-32 bg-background overflow-hidden">
            <ParticleBackground />
            <div className="container mx-auto px-6 relative flex flex-col items-center justify-center z-10">
                <div className="inline-block px-4 py-1 bg-muted rounded-full text-sm font-mono mb-6 text-muted-foreground">
                    05 / Equipo
                </div>

                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
                    <Users className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance">Un equipo multidisciplinario</h2>

                <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-5xl text-center">
                    Somos desarrolladores, diseñadores y estrategas apasionados por resolver problemas reales con tecnología y diseño.
                    Cada miembro del equipo aporta experiencia unica y un compromiso con la excelencia.
                </p>
            </div>
        </section>

        {/* WHY US SECTION */}
        <section className="relative py-24 md:py-32 bg-background overflow-hidden">
            <ParticleBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="inline-block px-4 py-1 bg-muted rounded-full text-sm font-mono mb-6 text-muted-foreground">
                        06 / Por qué elegirnos
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-balance">
                        Más que una agencia, somos tu socio tecnológico
                    </h2>

                    <div className="space-y-6">
                        {reasons.map((reason, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-lg text-foreground leading-relaxed">{reason}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-balance">
                        ¿Listo para llevar tu idea al siguiente nivel?
                    </h2>
                    <p className="text-xl text-primary-foreground/80 leading-relaxed text-pretty">
                        Conversemos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button variant="default" className="group flex items-center justify-center text-lg px-8 py-6 rounded-xl">
                            Agendar Llamada
                            <ArrowRight className="ml-2 w-5 h-5 inline-block group-hover:animate-[arrow-wiggle_0.9s_ease-in-out_infinite_alternate]" />
                        </Button>
                        <Button 
                            variant="outline" 
                            className="flex items-center justify-center text-lg px-8 py-6 rounded-xl bg-transparent border-primary-foreground/20 text-primary-foreground 
                            hover:bg-primary-foreground/10"
                        >
                            <Mail className="mr-2 w-5 h-5"/>
                            Contactar
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

