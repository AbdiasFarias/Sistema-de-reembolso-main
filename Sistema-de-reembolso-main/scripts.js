// seleciona os elementos do formúlario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da Lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// entrada de evento no input
amount.oninput = () => {
    // obtém o valor atual do input e remove os caractrs não numéricos
    let value = amount.value.replace(/\D/g, "")

    // transformar o valor em centavos
    value = Number(value) / 100


    // atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency", 
        currency: "BRL",
    })

    // retorna o valor formatado
    return value
}


form.onsubmit = (event) => {
    // previne o comportamento padrão de recarregar a página.
    event.preventDefault()
    
    // cria um objeto com os detalhes na nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        created_at: new Date(),
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        // cria o elemento de li para adicionar o item na lista (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome a categoria na div das informações da despesa.
        expenseInfo.append(expenseName, expenseCategory)

        // cria o valor da despesa.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
          .toUpperCase()
          .replace("R$", "")}`


          // cria o icone de remover
          const removeIcon = document.createElement("img")
          removeIcon.classList.add("remove-icon")
          removeIcon.setAttribute("src", "img/remove.svg")
          removeIcon.setAttribute("alt", "remover")

        // Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //Adiciona o Item na lista
        expenseList.append(expenseItem)

        // atualiza os totais.
        updateTotals()
    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar a lista de despesas.")
    }
}

function updateTotals() {
    try {
        // recupera todos os itens (li) da lista (ul)
        const items = expenseList.children

        // atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${
         items.length > 1 ? "despesas" : "despesa"
        }`


        //variável para incrementar o total.
        let total = 0

        // percorre cada item (li) da lista(ul)
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            // remover caracteres não númericos e substitui pelo ponto.
            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",",".")

            // converte o valor para float
            value = parseFloat(value)

            // verifica se é número válido.
            if (isNaN(value)) {
                return alert(
                    "Não foi possível calcular o total. O valor não parecer ser um número."
                )
            }
            
            // incrementar o valor total.
            total += Number(value)

        }

        expensesTotal.textContent = total


    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}








