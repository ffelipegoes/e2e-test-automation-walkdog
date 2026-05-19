export default function gerarCPF() {
  const cpf = [];

  // Gera os 9 primeiros dígitos aleatórios
  for (let i = 0; i < 9; i++) {
    cpf.push(Math.floor(Math.random() * 10));
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += cpf[i] * (10 - i);
  }

  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;
  cpf.push(digito1);

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += cpf[i] * (11 - i);
  }

  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;
  cpf.push(digito2);

  // Retorna formatado
  return cpf.join('');
}

// Exemplo de uso
console.log(gerarCPF());