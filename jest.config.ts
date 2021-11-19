module.exports = {
  moduleFileExtensions: ['js', 'ts', 'vue'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^typings/(.*)$': '<rootDir>/typings/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@typings/(.*)$': '<rootDir>/typings/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue3-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: './tsconfig.tests.json',
    },
    'vue3-jest': {
      tsconfig: './tsconfig.tests.json',
    },
  },
  testEnvironment: 'jsdom',
};
