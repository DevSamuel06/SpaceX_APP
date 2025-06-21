# 🚀 App SpaceX Explorer - React Native

Aplicativo mobile desenvolvido com **React Native + Expo**, que permite ao usuário:

- Cadastrar-se localmente
- Fazer login
- Buscar e visualizar cards com dados da **API pública da SpaceX**
- Ver detalhes de cada item

---

## 📱 Funcionalidades

### 🔐 Tela de Login

- Campos: Usuário, Senha
- Botões:
  - **Entrar** → Navega para a tela de Cards
  - **Cadastrar Usuário** → Navega para a tela de cadastro

---

### 📝 Tela de Cadastro

- Campos: Nome, Telefone, CPF, E-mail, Curso
- Salva os dados localmente com **AsyncStorage**
- Botão **Salvar**:
  - Armazena os dados
  - Retorna para a tela de Login

---

### 🛰️ Tela de Cards (consumindo a API da SpaceX)

- Busca dados da [API pública da SpaceX](https://github.com/r-spacex/SpaceX-API)
- Exibe cards com:
  - Imagem da missão
  - Nome
  - Status (sucesso/fracasso)
  - Outras informações relevantes
- Botões:
  - **ADD** → Adiciona novos cards (via nova chamada à API)
  - **EXCLUIR** → Remove o card selecionado
  - **VER MAIS DETALHES** → Leva à tela de detalhes

---

### 🔍 Tela de Detalhes do Card

- Exibe informações mais completas sobre o item selecionado
- Pode incluir:
  - Data do lançamento
  - Nome da missão
  - Foguete utilizado
  - Detalhes técnicos (de acordo com a API)

---

## 🔧 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/) para chamadas HTTP
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Instalação

```bash
git clone https://github.com/DevSamuel06/SpaceX_APP.git
cd spacex-app
npm install
npx expo start

```
Abra o app no Expo Go escaneando o QR Code exibido no terminal.

---

## 📂 Estrutura do Projeto

	/src
	  /components        // Componentes reutilizáveis (ex: CardItem, PrimaryButton)
	  /screens           // Telas: Login, Cadastro, Cards, Detalhes
	  /services          // Requisições HTTP para a API da SpaceX
	  /types             // Tipos TypeScript (ex: CardData)
	  /theme             // Cores e estilos globais
	App.tsx              // Navegação principal entre telas
	
---

## 📄 Licença

Este projeto foi criado com fins educacionais para praticar:

- Consumo de APIs públicas

- Armazenamento local

- Navegação entre telas

- Gerenciamento de estado e dados em apps React Native

