import { test, expect } from '@playwright/test';
// JSON dados para inserção
import employees from '../employees.json'

test('Realizar login, navegar para o cadastro de profissionais e cadastrar em lote', async ({ page, browser }) => {
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

  // Navegar para a página de Cadastro de Profissionais
  await page.goto('https://maisvidas.hopesolution.com.br/HEALTHCAREGESTAOEMSAUDE/Profissional');
  await expect(page.getByRole('button', { name: 'Novo' })).toBeVisible();
  console.log('Navegou para a página de Cadastro de Profissionais.');

  // Loopar cadastros de cada profissional
  for (const employee of employees) {
    console.log(`Cadastrando profissional: ${employee.nome}`);
    // Na página de listagem, clique em "Novo" para ir ao formulário
    await page.getByRole('button', { name: 'Novo' }).click();

    await page.waitForURL('https://maisvidas.hopesolution.com.br/HEALTHCAREGESTAOEMSAUDE/Profissional/Viewer')

    // Preencha os dados do profissional no formulário
    await page.locator('#Profissional_NomeCompletoRazaoSocial').fill(employee.nome);
    await page.locator('#Profissional_CpfCnpj').fill(employee.cpf as string);

    // Interação com o plugin chosen do jquery seleciona o select input
    const chosenContainerId = '#Profissional_ProfissaoID_chosen';
    await page.locator(chosenContainerId).click();

    // Põe a profissão dentro do input
    const chosenSearchInput = `${chosenContainerId} .chosen-search-input`;
    await page.locator(chosenSearchInput).fill(employee.profissão);

    // Seleciona a profissão buscada
    const chosenResultOption = `${chosenContainerId} .chosen-results li:has-text("${employee.profissão}")`;
    await page.locator(chosenResultOption).getByText(employee.profissão, {exact: true}).click();

    // Clicar em Salvar
    await page.getByRole('button', { name: 'Salvar' }).click();

    // Clicar em Voltar para retornar à página de listagem
    await page.getByRole('button', { name: 'Voltar' }).click();

    // Garante que o script retornou à página de listagem e o botão "Novo" está visível novamente.
    await expect(page.getByRole('button', { name: 'Novo' })).toBeVisible();
    console.log(`Profissional ${employee.nome} cadastrado e retornou à listagem.`);
  }

  console.log('Todos os profissionais foram cadastrados com sucesso!');
});