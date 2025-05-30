// seleciona os elementos do formúlario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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
}

function expenseAdd(newExpense) {
    try {
        // cria o elemento de li para adicionar o item na lista (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")
    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
}






