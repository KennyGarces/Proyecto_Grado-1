import { Lock } from 'lucide-react'

export default function HomePage() {
  const challenges = [
    {
      id: 1,
      title: 'Secuencia Correcta',
      concept: 'Secuenciación',
      description: 'Aprende a ordenar instrucciones de manera lógica',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
      level: 'Nivel 1',
    },
    {
      id: 2,
      title: 'Patrón Perdido',
      concept: 'Reconocimiento de patrones',
      description: 'Identifica y completa patrones en secuencias',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-slate-400 to-slate-600',
      level: 'Nivel 2',
    },
    {
      id: 3,
      title: 'Camino del Robot',
      concept: 'Algoritmos',
      description: 'Guía al robot por el laberinto usando comandos',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-stone-400 to-stone-600',
      level: 'Nivel 3',
    },
    {
      id: 4,
      title: 'Error en el Código',
      concept: 'Depuración',
      description: 'Encuentra y corrige errores en el código',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-green-600 to-green-800',
      level: 'Nivel 4',
    },
    {
      id: 5,
      title: 'Adivina la Regla',
      concept: 'Abstracción',
      description: 'Descubre las reglas ocultas del sistema',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
      level: 'Nivel 5',
    },
    {
      id: 6,
      title: '¿Qué paso sigue?',
      concept: 'Secuenciación',
      description: 'Predice el siguiente paso en la secuencia',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-gray-400 to-gray-600',
      level: 'Nivel 6',
    },
    {
      id: 7,
      title: 'Construye el Puente',
      concept: 'Resolución de problemas',
      description: 'Conecta los puntos usando lógica estructurada',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-amber-600 to-amber-800',
      level: 'Nivel 7',
    },
    {
      id: 8,
      title: 'Laberinto Lógico',
      concept: 'Pensamiento computacional',
      description: 'Navega usando principios de programación',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-pink-400 to-pink-600',
      level: 'Nivel 8',
    },
    {
      id: 9,
      title: 'Código Maestro',
      concept: 'Integración',
      description: 'Combina todos los conceptos aprendidos',
      disabled: true,
      bgColor: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
      level: 'Nivel 9',
    },
  ]

  return (
    <div className='w-full rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-6'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <h1 className='text-primary mb-4 text-4xl font-bold'>
            Mapa de Desafíos
          </h1>
          <p className='text-lg text-gray-600'>
            Desarrolla tu pensamiento paso a paso
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {challenges.map(challenge => (
            <div
              key={challenge.id}
              className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-105 ${
                challenge.disabled
                  ? 'cursor-not-allowed opacity-75'
                  : 'cursor-pointer hover:shadow-xl'
              }`}>
              {/* Card Header */}
              <div className={`relative h-32 ${challenge.bgColor} p-0`}>
                <div className='absolute inset-0 bg-black/20' />
                <div className='relative flex h-full items-center justify-center'>
                  <h2 className='text-2xl font-bold text-white drop-shadow-lg'>
                    {challenge.level}
                  </h2>
                </div>
                {challenge.disabled && (
                  <div className='absolute top-3 right-3'>
                    <div className='rounded-full bg-white/20 p-2 backdrop-blur-sm'>
                      <Lock className='h-4 w-4 text-white' />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className='p-4'>
                <div className='mb-3'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {challenge.title}
                  </h3>
                  <span className='mt-1 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'>
                    Concepto: {challenge.concept}
                  </span>
                </div>

                <p className='text-sm leading-relaxed text-gray-600'>
                  {challenge.description}
                </p>

                <div className='mt-4 flex items-center justify-between'>
                  {challenge.disabled ? (
                    <span className='inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-500'>
                      <Lock className='mr-1 h-3 w-3' />
                      Bloqueado
                    </span>
                  ) : (
                    <span className='inline-flex items-center rounded-full bg-purple-600 px-2.5 py-0.5 text-xs font-medium text-white hover:bg-purple-700'>
                      Jugar
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <p className='text-gray-500'>
            Los desafíos se desbloquearán progresivamente conforme completes
            cada nivel
          </p>
        </div>
      </div>
    </div>
  )
}
