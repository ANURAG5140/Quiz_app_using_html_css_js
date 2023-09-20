const quizData = [
    {
      question: 'Which case of data structure operation takes maximum time?',
      options: ['Worst case', 'Best case', 'Average case', 'None of the above'],
      answer: 'Worst case',
    },
    {
      question: 'O(1) means computing time is _____',
      options: ['Constant', 'Quadratic', 'Linear', 'Cubic'],
      answer: 'Constant',
    },
    {
      question: 'Which data structure allows deleting data elements from front and inserting at rear?',
      options: ['Stacks', 'Queues', 'Deques', 'Binary search tree'],
      answer: 'Queues',
    },
    {
      question: 'Which of the following sorting algorithm is of divide-and-conquer type?',
      options: ['Bubble sort', 'Insertion sort', 'Quick sort', 'Selection sort'],
      answer: 'Quick sort',
    },
    {
      question: 'In circular linked list, insertion of node requires modification of?',
      options: [
        'One Pointer',
        'Two Pointer',
        'Three Pointer',
        'None',
      ],
      answer: 'Two Pointer',
    },
    {
      question: 'Process of inserting an element in stack is called _____',
      options: ['Create', 'Push', 'Evaluation', 'Pop'],
      answer: 'Push',
    },
    {
      question: 'What is the worst case complexity of bubble sort?',
      options: [
        'O(nlogn)',
        'O(logn)',
        'O(n)',
        'O(n2)',
      ],
      answer: 'O(n2)',
    },
    {
      question: ' Which data structure is needed to convert infix notation to postfix notation?',
      options: ['Branch', 'Tree', 'Queue', 'Stack'],
      answer: 'Stack',
    },
    {
      question: 'A Binary Tree can have',
      options: [
        'Can have 2 children',
        'Can have 1 children',
        'Can have 0 children',
        'All of the above',
      ],
      answer: 'All of the above',
    },
    {
      question: 'The complexity of linear search algorithm is',
      options: ['O(n)', 'O(log n)', 'O(n2)', 'O(n log n)'],
      answer: 'O(n)',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  
  const resultContainer = document.getElementById('result');
  
  const submitButton = document.getElementById('submit');

  const retryButton = document.getElementById('retry');
  
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();