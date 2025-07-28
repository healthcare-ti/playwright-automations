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
  await page.goto('https://maisvidas.hopesolution.com.br/HEALTHCAREGESTAOEMSAUDE/Profissional');
  const totalPages = parseInt(await page.$eval('#txtCurrentPage', el => el.dataset.totalpages));

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    console.log(`➡️ Navegando para página ${currentPage}`);
    await goToPageViaClick(page, currentPage);

    let rows = await page.$$('table tr:not(:first-child)');

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      rows = await page.$$('table tr:not(:first-child)');
      const row = rows[rowIndex];

      const nameCell = await row.$('td:nth-child(3)');
      if (!nameCell) continue;

      const originalName = (await nameCell.innerText()).trim();

      if (originalName !== originalName.toUpperCase()) {
        const newName = originalName.toUpperCase();
        console.log(`✏️ Corrigindo: "${originalName}" => "${newName}"`);

        const editButton = await row.$('.btnEdit');

        await editButton.click()
        await page.waitForSelector('#Profissional_NomeCompletoRazaoSocial')

        await page.fill('#Profissional_NomeCompletoRazaoSocial', newName);

        await page.click('button.btn-tab-save')
        await page.waitForSelector('button.btnCancel')

        await page.click('button.btnCancel')
        await page.waitForSelector('table tr:not(:first-child)')

        // ⚠ REFORÇA a volta para a página correta via clique
        await goToPageViaClick(page, currentPage);
      }
    }
  }

  // ✅ Função corrigida: navegação por clique no <a data-pagina="x">
  async function goToPageViaClick(page, pageNumber) {
    const paginationLink = await page.$(`a[data-pagina="${pageNumber}"]`);
    if (!paginationLink) {
      throw new Error(`❌ Não foi possível encontrar o link da página ${pageNumber}`);
    }

    await paginationLink.click()
    await page.waitForSelector('table tr:not(:first-child)')
  }

  console.log('✅ Finalizado com sucesso!');
  await browser.close();
});