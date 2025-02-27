import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Car } from '../data/cars'

interface CompareDrawerProps {
  isOpen: boolean
  onClose: () => void
  cars: Car[]
  onRemove: (carId: number) => void
}

const CompareDrawer = ({ isOpen, onClose, cars, onRemove }: CompareDrawerProps) => {
  const { t } = useTranslation()

  const compareFields = [
    { 
      key: 'price', 
      label: t('catalog.car.price'), 
      format: (value: number) => `${value} €/${t('car.perDay')}` 
    },
    { 
      key: 'specs.seats', 
      label: t('car.specs.seats')
    },
    { 
      key: 'specs.transmission', 
      label: t('car.specs.transmission')
    },
    { 
      key: 'specs.fuel', 
      label: t('car.specs.fuel')
    },
    { 
      key: 'specs.consumption', 
      label: t('car.specs.consumption'),
      format: (value: number, car: Car) => car.specs.fuel === 'Electric' ? '0 L/100km' : `${value} L/100km`
    },
    { 
      key: 'specs.year', 
      label: t('car.specs.year')
    }
  ]

  const getValue = (car: Car, field: { key: string, format?: (value: any, car: Car) => string }) => {
    const value = field.key.split('.').reduce((obj: any, key) => obj[key], car)
    return field.format ? field.format(value, car) : value
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between p-4 sm:px-6">
                        <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                          {t('catalog.compare.title')}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={onClose}
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 px-4 py-6 sm:px-6">
                      {cars.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-lg text-gray-500 dark:text-gray-400">
                            {t('catalog.compare.empty')}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {/* Карточки автомобилей */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.map((car) => (
                              <div key={car.id} className="relative bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <button
                                  onClick={() => onRemove(car.id)}
                                  className="absolute -top-2 -right-2 p-1.5 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
                                >
                                  <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                </button>
                                <div className="aspect-w-16 aspect-h-9 mb-4">
                                  <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">
                                  {car.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                  {t(`catalog.categories.${car.category.toLowerCase()}`)}
                                </p>

                                {/* Характеристики */}
                                <div className="space-y-3">
                                  {compareFields.map((field) => (
                                    <div key={field.key} className="flex justify-between items-center text-sm">
                                      <span className="text-gray-500 dark:text-gray-400">{field.label}:</span>
                                      <span className="font-medium text-gray-900 dark:text-white">
                                        {getValue(car, field)}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                {/* Особенности */}
                                <div className="mt-6">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    {t('catalog.car.features')}
                                  </h4>
                                  <div className="grid grid-cols-1 gap-2">
                                    {car.features.map((feature, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                                      >
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                                        {t(`features.${feature}`)}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CompareDrawer 