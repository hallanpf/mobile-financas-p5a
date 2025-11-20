Dupla: Hallan Pedrosa Ferreira e Jhonatan Domingos da Silva

# Frontend (Expo)

Instalação e execução rápidas para o frontend (React Native + Expo).

Pré-requisitos
- Node.js
- npm ou yarn

Instalação
```powershell
cd frontend
npm install
# ou: yarn install
```

Comandos
- `npm start` — abre o painel do Expo
- `npm run android` — inicia no emulador Android
- `npm run ios` — inicia no iOS simulator (macOS)
- `npm run web` — executa com React Native Web

Configurar URL da API
Edite `app/services/api.js` se necessário. Exemplos:
- Desenvolvimento local (backend na mesma máquina): `http://localhost:3333`
- Android emulator: `http://10.0.2.2:3333`
- Dispositivo físico: `http://<SEU_IP_LOCAL>:3333`

Autenticação
- Login salva o token em `AsyncStorage` com a chave `@finToken` e o app adiciona o header `Authorization` nas requisições.

Criar usuário (SignUp)
- Pelo app: abra a tela "Criar conta" / "SignUp" e preencha `Nome`, `Email` e `Senha`.
- Pela API (opcional): `POST /users` com JSON `{ name, email, password }`.
- Após criar, faça login (SignIn) para obter o token e usar as rotas autenticadas.
