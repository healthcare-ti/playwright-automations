import { test, expect } from '@playwright/test';
// JSON dados para inserção
import employees from '../hello.json'

test('Realizar login, navegar para o cadastro de pacientes e cadastrar em lote', async ({ page, browser }) => {
  // Sua lista de profissionais

  // 1. Realizar o Login
  await page.goto('https://maisvidas.hopesolution.com.br/HEALTHCAREGESTAOEMSAUDE/User/Login');

  // Preenche o usuário e a senha
  await page.locator('#txtUser').fill(process.env.LOGIN); // **SUBSTITUA PELO SEU USUÁRIO**
  await page.locator('#txtPass').fill(process.env.PASSWORD); // **SUBSTITUA PELA SUA SENHA**

  // Clica no botão de login
  page.locator('#btnEntrar').click(),

  // Verifica se o login foi bem sucedido (mensagem de boas-vindas)
  await expect(page.locator('h1:has-text("bem-vindo(a) ao MaisVidas")')).toBeVisible();
  console.log('Login realizado com sucesso!');

  // Navega para a página de Cadastro de Pacientes
  await page.goto('https://maisvidas.hopesolution.com.br/HEALTHCAREGESTAOEMSAUDE/Paciente');
  await expect(page.getByRole('button', { name: 'Novo' })).toBeVisible();
  console.log('Navegar para a página de Cadastro de Pacientes.');

  // Loopar cadastros de cada profissional
  for (const employee of employees) {
    console.log(`Cadastrando paciente: ${employee}`);
    // Na página de listagem, clique em "Novo" para ir ao formulário
    await page.getByRole('button', { name: 'Novo' }).click();

    await page.waitForURL('https://maisvidas.hopesolution.com.br/HEALTHCAREGESTAOEMSAUDE/Paciente/Viewer')

    // Preencha os dados do profissional no formulário
    await page.locator('#Paciente_NomeCompletoRazaoSocial').fill(employee);

    // Clicar em Salvar
    await page.getByRole('button', { name: 'Salvar' }).click();

    // Clicar em Voltar para retornar à página de listagem
    await page.getByRole('button', { name: 'Voltar' }).click();

    // Garante que o script retornou à página de listagem e o botão "Novo" está visível novamente.
    await expect(page.getByRole('button', { name: 'Novo' })).toBeVisible();
  }

  console.log('Todos os profissionais foram cadastrados com sucesso!');
});