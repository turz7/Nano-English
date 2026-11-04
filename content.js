export const course = {
  id: "a1-start-here",
  title: "Inglês para o dia a dia",
  targetLanguage: "English",
  supportLanguage: "Português",
  level: "A1",
  description: "Uma trilha curta para começar a entender e usar inglês em situações comuns.",
  units: [{
    id: "unit-1",
    title: "Primeiros encontros",
    summary: "Cumprimente, apresente-se e peça o que precisa com confiança.",
    lessons: [
      lesson("greetings", "Hello! Greetings and polite expressions", "Cumprimentar alguém e usar expressões básicas de cortesia", "8 min", null,
        ["Hello! / Hi!", "Good morning.", "How are you? — I'm fine, thanks.", "Please / Thank you", "Goodbye! / See you later!"],
        "Hello! My name is Ana. Nice to meet you. — Hi, Ana. Nice to meet you, too!",
        "Comece lembrando: como você cumprimentaria alguém que acabou de conhecer?",
        "Em inglês, Hello e Hi são cumprimentos comuns. Use please para fazer um pedido com educação e thank you para agradecer. Nice to meet you significa É um prazer conhecer você. A resposta natural é Nice to meet you, too!",
        [{english:"Hello!", portuguese:"Olá!", pronunciation:"/həˈloʊ/ — algo como ‘rəlôu’"},{english:"Good morning.", portuguese:"Bom dia.", pronunciation:"/ɡʊd ˈmɔːrnɪŋ/"},{english:"How are you?", portuguese:"Como você está?", pronunciation:"/haʊ ɑr juː/"},{english:"Thank you.", portuguese:"Obrigado(a).", pronunciation:"/θæŋk juː/ — o som inicial de thank não é igual ao t"},{english:"See you later!", portuguese:"Até mais!", pronunciation:"/siː juː ˈleɪtər/"}],
        [{speaker:"Ana", text:"Hello! My name is Ana. Nice to meet you."},{speaker:"Leo", text:"Hi, Ana. Nice to meet you, too! How are you?"},{speaker:"Ana", text:"I'm fine, thanks. See you later!"}],
        [{type:"choice", prompt:"Qual expressão significa ‘Bom dia’?", choices:["Good night.","Good morning.","Goodbye."], answer:"Good morning.", hint:"Pense na palavra morning: manhã.", feedback:"Good morning é a forma usada pela manhã."},{type:"choice", prompt:"Você recebe ajuda. O que responde?", choices:["Thank you.","Please.","Hello."], answer:"Thank you.", hint:"É uma forma de agradecer.", feedback:"Thank you significa obrigado ou obrigada."},{type:"text", prompt:"Complete: Nice to meet ___. (prazer em conhecer você também)", answers:["you too","you, too"], hint:"A expressão tem duas palavras: you + too.", feedback:"Nice to meet you, too! é uma resposta natural ao conhecer alguém."}]),
      lesson("introductions", "This is me", "Dizer seu nome, país e perguntar essas informações", "10 min", "greetings",
        ["My name is...", "I'm from...", "Where are you from?", "I'm Brazilian.", "Nice to meet you."],
        "Hi! My name is Lucas. I'm from Brazil. Where are you from? — I'm from Portugal. Nice to meet you!",
        "Qual foi a frase de apresentação da lição anterior? Tente dizer seu nome em inglês.",
        "Para dizer seu nome, use My name is... ou I’m... . Para falar de origem, use I’m from + lugar. A pergunta Where are you from? significa De onde você é? Brazilian e Portuguese são adjetivos de nacionalidade; use a forma que descreve você.",
        [{english:"My name is Lucas.", portuguese:"Meu nome é Lucas.", pronunciation:"/maɪ neɪm ɪz/"},{english:"I'm from Brazil.", portuguese:"Sou do Brasil.", pronunciation:"/aɪm frəm brəˈzɪl/"},{english:"Where are you from?", portuguese:"De onde você é?", pronunciation:"/wer ɑr juː frəm/"},{english:"I'm Brazilian.", portuguese:"Sou brasileiro(a).", pronunciation:"/aɪm brəˈzɪliən/"},{english:"I'm Portuguese.", portuguese:"Sou português(a).", pronunciation:"/aɪm ˌpɔːrtʃəˈɡiːz/"}],
        [{speaker:"Maya", text:"Hi! My name is Maya. Where are you from?"},{speaker:"Rui", text:"I'm from Portugal. And you?"},{speaker:"Maya", text:"I'm from Brazil. Nice to meet you!"}],
        [{type:"choice", prompt:"Como dizer ‘Sou do Brasil’?", choices:["I'm Brazil.","I'm from Brazil.","I from Brazil."], answer:"I'm from Brazil.", hint:"Para origem, use I’m from + lugar.", feedback:"I’m from Brazil é a frase correta para falar de origem."},{type:"text", prompt:"Complete: My ___ is Sofia. (meu nome é Sofia)", answers:["name"], hint:"A palavra aparece em My name is... .", feedback:"My name is Sofia significa Meu nome é Sofia."},{type:"choice", prompt:"Qual pergunta significa ‘De onde você é?’", choices:["What is your name?","Where are you from?","How are you?"], answer:"Where are you from?", hint:"Where pergunta sobre lugar.", feedback:"Where are you from? pergunta sobre a origem da pessoa."}]),
      lesson("to-be", "I am, you are", "Usar os pronomes pessoais e as formas básicas do verbo to be", "12 min", "introductions",
        ["I am / I'm", "You are / You're", "He is / He's", "She is / She's", "We are / We're"],
        "I am a student. You are my classmate. She is from Brazil. We are ready!",
        "Complete mentalmente: I ___ from Brazil. Você já conhece essa frase.",
        "O verbo to be aparece como am, are ou is no presente. I usa am; you, we e they usam are; he e she usam is. As formas curtas (I’m, you’re, she’s) são muito comuns na fala e na escrita informal.",
        [{english:"I am / I'm", portuguese:"Eu sou / estou", pronunciation:"/aɪ æm/ — /aɪm/"},{english:"You are / You're", portuguese:"Você é / está", pronunciation:"/juː ɑr/ — /jʊr/"},{english:"He is / He's", portuguese:"Ele é / está", pronunciation:"/hiː ɪz/ — /hiːz/"},{english:"She is / She's", portuguese:"Ela é / está", pronunciation:"/ʃiː ɪz/ — /ʃiːz/"},{english:"They are / They're", portuguese:"Eles/elas são / estão", pronunciation:"/ðeɪ ɑr/ — /ðer/"}],
        [{speaker:"Nina", text:"Are you a student?"},{speaker:"Tom", text:"Yes, I am. You are a student, too!"},{speaker:"Nina", text:"Yes, we are classmates."}],
        [{type:"choice", prompt:"Escolha a forma correta: She ___ from Portugal.", choices:["am","are","is"], answer:"is", hint:"She usa a forma is.", feedback:"She is é a combinação correta."},{type:"text", prompt:"Complete: I ___ ready. (estou pronto/pronta)", answers:["am"], hint:"Com I, use am.", feedback:"I am ready significa Estou pronto ou pronta."},{type:"choice", prompt:"Qual é a forma curta de You are?", choices:["You're","You'am","You is"], answer:"You're", hint:"A forma curta junta you + are.", feedback:"You’re é a contração de you are."}]),
      lesson("questions", "Simple questions", "Perguntar e responder nome, cidade e profissão", "12 min", "to-be",
        ["What is your name?", "Where do you live?", "Are you a student?", "Yes, I am.", "No, I'm not."],
        "What is your name? — My name is Jo. Where do you live? — I live in Lisbon. Are you a student? — Yes, I am.",
        "Você consegue perguntar o nome de alguém sem traduzir palavra por palavra?",
        "What pergunta sobre informação; where pergunta sobre lugar. Com to be, a pergunta pode começar com Is/Are: Are you a student? Para responder, repita o verbo: Yes, I am ou No, I’m not. Em inglês, não usamos ‘am I’ para responder a uma pergunta com you.",
        [{english:"What is your name?", portuguese:"Qual é o seu nome?", pronunciation:"/wʌt ɪz jʊr neɪm/"},{english:"Where do you live?", portuguese:"Onde você mora?", pronunciation:"/wer duː juː lɪv/"},{english:"Are you a student?", portuguese:"Você é estudante?", pronunciation:"/ɑr juː ə ˈstuːdənt/"},{english:"Yes, I am.", portuguese:"Sim.", pronunciation:"/jes aɪ æm/"},{english:"No, I'm not.", portuguese:"Não.", pronunciation:"/noʊ aɪm nɑt/"}],
        [{speaker:"Jo", text:"What is your name?"},{speaker:"Mia", text:"My name is Mia. Where do you live?"},{speaker:"Jo", text:"I live in São Paulo. Are you a student?"},{speaker:"Mia", text:"Yes, I am."}],
        [{type:"choice", prompt:"Qual pergunta pede o nome?", choices:["Where do you live?","What is your name?","Are you a student?"], answer:"What is your name?", hint:"What is your... pergunta por uma informação.", feedback:"What is your name? é a pergunta sobre o nome."},{type:"text", prompt:"Complete: Are you a student? — Yes, I ___.", answers:["am"], hint:"A resposta curta repete am.", feedback:"Yes, I am é a resposta curta correta."},{type:"choice", prompt:"Como dizer ‘Não, eu não sou’?", choices:["No, I am not.","No, I are not.","No, I not."], answer:"No, I am not.", hint:"Com I, use am; na negativa, am not.", feedback:"No, I am not é a forma completa. I’m not também é possível."}]),
      lesson("needs", "Everyday needs", "Fazer pedidos simples e responder com educação", "14 min", "questions",
        ["Can I have...?", "I'd like...", "Please.", "Here you are.", "Anything else?"],
        "Can I have a coffee, please? — Sure. Here you are. — Thank you!",
        "Como você pediria algo com educação em português? Vamos levar essa intenção para o inglês.",
        "Can I have...? é um pedido educado e útil. I’d like... significa Eu gostaria de... . Here you are pode acompanhar a entrega de algo. Para oferecer mais, a pessoa pode dizer Anything else?; a resposta comum é No, thank you.",
        [{english:"Can I have a coffee, please?", portuguese:"Posso pedir um café, por favor?", pronunciation:"/kæn aɪ hæv ə ˈkɔːfi pliːz/"},{english:"I'd like some water.", portuguese:"Eu gostaria de água.", pronunciation:"/aɪd laɪk sʌm ˈwɔːtər/"},{english:"Here you are.", portuguese:"Aqui está.", pronunciation:"/hɪr juː ɑr/"},{english:"Anything else?", portuguese:"Mais alguma coisa?", pronunciation:"/ˈeniθɪŋ els/"},{english:"No, thank you.", portuguese:"Não, obrigado(a).", pronunciation:"/noʊ θæŋk juː/"}],
        [{speaker:"Customer", text:"Hello. Can I have a sandwich, please?"},{speaker:"Server", text:"Sure. Anything else?"},{speaker:"Customer", text:"I'd like some water, please."},{speaker:"Server", text:"Here you are."}],
        [{type:"choice", prompt:"Qual pedido é educado?", choices:["Give coffee.","Can I have a coffee, please?","Coffee now."], answer:"Can I have a coffee, please?", hint:"Use Can I have + please.", feedback:"Can I have a coffee, please? é um pedido natural e educado."},{type:"text", prompt:"Complete: Here you ___. (aqui está)", answers:["are"], hint:"A expressão termina com are.", feedback:"Here you are é usado ao entregar algo."},{type:"choice", prompt:"O que responder a Anything else? quando não quer mais nada?", choices:["No, thank you.","Yes, I am.","Good morning."], answer:"No, thank you.", hint:"Você está recusando com educação.", feedback:"No, thank you significa Não, obrigado(a)."}])
    ]
  }]
};

function lesson(id, title, objective, minutes, prerequisite, phrases, dialogueText, warmup, explanation, vocabulary, dialogue, exercises) {
  return { id, title, level: "A1", order: 0, estimatedMinutes: minutes, objective, prerequisites: prerequisite ? [prerequisite] : [], warmup, explanation, examples: phrases.map((english) => ({ english, portuguese: "Frase útil para a situação da lição." })), vocabulary, dialogue, resource: { status: "unavailable", provider: null, title: "Recurso em revisão", sourceUrl: null, embedUrl: null, verification: "Ainda não revisado para relevância, legendas e incorporação." }, exercises, wrapUp: `Você praticou: ${objective.toLowerCase()}. Revise as frases e volte quando quiser.` };
}

const videoResources = {
  greetings: { status: "reviewed", provider: "YouTube · English Evolution Step 1", title: "Improve English: Greetings in English for Beginners", sourceUrl: "https://www.youtube.com/watch?v=btyfu4eNZMM", embedUrl: "https://www.youtube-nocookie.com/embed/btyfu4eNZMM", duration: "24 min", captions: "Legendas do YouTube podem estar disponíveis; o diálogo escrito desta lição é a alternativa.", objectiveMatch: "Cumprimentos, Good morning, How are you? e diálogos curtos.", rights: "Conteúdo de terceiro no YouTube; usamos apenas a incorporação oficial e não baixamos nem re-hospedamos o vídeo.", verification: "Descrição pública consultada em 2026-11-03; disponibilidade de legendas e incorporação depende do YouTube." },
  introductions: { status: "reviewed", provider: "YouTube · English Evolution Step 1", title: "How to Introduce Yourself in English | A1 Beginner", sourceUrl: "https://www.youtube.com/watch?v=uFCLHfjN_eo", embedUrl: "https://www.youtube-nocookie.com/embed/uFCLHfjN_eo", duration: "A1 · duração não informada na listagem consultada", captions: "Legendas do YouTube podem estar disponíveis; use também o diálogo e as traduções da lição.", objectiveMatch: "Nome, país, cidade, profissão/estudo e conversa inicial.", rights: "Conteúdo de terceiro no YouTube; usamos apenas a incorporação oficial e não baixamos nem re-hospedamos o vídeo.", verification: "Descrição pública consultada em 2026-11-03; disponibilidade de legendas e incorporação depende do YouTube." },
  "to-be": { status: "reviewed", provider: "YouTube · English with Jennifer", title: "Basic English Grammar (A1): Verb ‘BE’ in the Present Tense", sourceUrl: "https://www.youtube.com/watch?v=yJNr3BrmiGo", embedUrl: "https://www.youtube-nocookie.com/embed/yJNr3BrmiGo", duration: "8:51", captions: "A listagem oferece transcrição; confirme as legendas no player se necessário.", objectiveMatch: "I am, you are, he/she is, contrações, perguntas e negativas.", rights: "Conteúdo de terceiro no YouTube; usamos apenas a incorporação oficial e não baixamos nem re-hospedamos o vídeo.", verification: "Descrição, índice e transcrição pública consultados em 2026-11-03; disponibilidade de incorporação depende do YouTube." },
  questions: { status: "reviewed", provider: "YouTube · English with Alex / engVid", title: "Basic English Lesson: How to Talk about Yourself", sourceUrl: "https://www.youtube.com/watch?v=fiXs8xQgmmU", embedUrl: "https://www.youtube-nocookie.com/embed/fiXs8xQgmmU", duration: "10:21", captions: "A página pública descreve prática com perguntas e respostas; use a transcrição/legendas do player quando disponíveis.", objectiveMatch: "Nome, nacionalidade, origem, profissão, localização e perguntas pessoais simples.", rights: "Conteúdo de terceiro no YouTube; usamos apenas a incorporação oficial e não baixamos nem re-hospedamos o vídeo.", verification: "Descrição pública consultada em 2026-11-03; disponibilidade de legendas e incorporação depende do YouTube." },
  needs: { status: "reviewed", provider: "YouTube · Easy English Official", title: "English Level 20: Making Polite Requests (Can I have? / Can you?)", sourceUrl: "https://www.youtube.com/watch?v=qylU8cpxsI4", embedUrl: "https://www.youtube-nocookie.com/embed/qylU8cpxsI4", duration: "Beginner · duração não informada na listagem consultada", captions: "Legendas do YouTube podem estar disponíveis; o diálogo da cafeteria nesta lição é a alternativa escrita.", objectiveMatch: "Can I have..., Can you...?, please e pedidos em café/loja.", rights: "Conteúdo de terceiro no YouTube; usamos apenas a incorporação oficial e não baixamos nem re-hospedamos o vídeo.", verification: "Descrição pública consultada em 2026-11-03; disponibilidade de legendas e incorporação depende do YouTube." }
};

for (const item of course.units.flatMap((unit) => unit.lessons)) item.resource = videoResources[item.id];

export function validateCourse(data) {
  const lessons = data.units.flatMap((unit) => unit.lessons);
  const ids = new Set();
  for (const item of lessons) {
    if (!item.id || !item.objective || !item.explanation || item.exercises.length < 3) throw new Error(`Lição inválida: ${item.id}`);
    if (ids.has(item.id)) throw new Error(`ID duplicado: ${item.id}`);
    ids.add(item.id);
    for (const exercise of item.exercises) {
      if (!exercise.prompt || !exercise.feedback) throw new Error(`Exercício inválido em ${item.id}`);
      if (exercise.type === "choice" && !exercise.choices.includes(exercise.answer)) throw new Error(`Resposta inválida em ${item.id}`);
    }
    if (["reviewed", "verified"].includes(item.resource.status) && (!item.resource.sourceUrl || !item.resource.embedUrl)) throw new Error(`Recurso sem URLs em ${item.id}`);
  }
  return true;
}

validateCourse(course);
