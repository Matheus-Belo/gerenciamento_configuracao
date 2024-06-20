module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/components/testeUnitario/**/*.test.ts?(x)'],  // Define a localização dos seus testes
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',  // Mapeia arquivos de estilo para que o Jest possa lidar com eles
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Configurações adicionais (opcional)
  };
  