export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  pointsReward: number;
  content: string;
  quiz: QuizQuestion[];
}

export const LESSONS: Lesson[] = [
  {
    id: 'what-is-ai',
    title: 'What is AI?',
    description:
      'An introduction to artificial intelligence — what it is, how it works, and why it matters.',
    icon: 'brain',
    pointsReward: 50,
    content: `Artificial Intelligence (AI) is the simulation of human intelligence by computer systems. It involves creating software that can learn, reason, and make decisions — tasks that traditionally required human thinking.

## Types of AI

**Narrow AI** — Also called "Weak AI", this is AI designed to perform a specific task. Examples include voice assistants like Siri, recommendation algorithms on Netflix, and spam filters in your email. Most AI you interact with today is Narrow AI.

**General AI** — Also called "Strong AI", this would be AI that can understand, learn, and apply intelligence across any task a human can do. This does not yet exist but is the long-term goal of AI research.

## How AI Works

At its core, AI learns from data. Here's the simplified process:

1. **Data Collection** — Large amounts of data are gathered (text, images, numbers, etc.)
2. **Training** — An AI model processes this data and identifies patterns
3. **Prediction** — The trained model can then make predictions or decisions on new, unseen data
4. **Feedback** — The model's predictions are evaluated, and it continues to improve

## Real-World Applications

AI is already transforming industries across Africa and the world:

• **Healthcare** — AI assists doctors in diagnosing diseases from medical images
• **Agriculture** — Smart farming tools predict weather patterns and crop yields
• **Finance** — Fraud detection systems protect your bank transactions in real-time
• **Education** — Personalized learning platforms adapt to each student's pace
• **Transportation** — Ride-hailing apps use AI to optimize routes and pricing

## Key Takeaways

AI is not magic — it's mathematics and data. Understanding how it works puts you ahead in the digital economy. The demand for people who can work with AI is growing rapidly across Africa, creating new career opportunities every day.`,
    quiz: [
      {
        question: 'What type of AI is currently most common in everyday applications?',
        options: ['General AI', 'Narrow AI', 'Super AI', 'Quantum AI'],
        correctIndex: 1,
      },
      {
        question: 'What is the first step in how AI typically learns?',
        options: [
          'Making predictions',
          'Writing code',
          'Collecting data',
          'Building hardware',
        ],
        correctIndex: 2,
      },
      {
        question:
          'Which of these is a real-world application of AI in healthcare?',
        options: [
          'Replacing all doctors',
          'Assisting in diagnosing diseases from medical images',
          'Performing surgery without any human',
          'Creating new medicines instantly',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'digital-skills-that-pay',
    title: 'Digital Skills That Pay',
    description:
      'Explore the most in-demand digital skills in Africa\'s growing tech economy.',
    icon: 'trending-up',
    pointsReward: 50,
    content: `The digital economy in Africa is booming. By 2030, the continent's internet economy is projected to contribute over $180 billion to GDP. This means massive opportunities for anyone with the right digital skills.

## Top In-Demand Skills

### 1. Data Annotation & AI Training
Companies building AI products need humans to label and verify data. This includes tagging images, transcribing audio, and validating AI outputs. It's one of the most accessible entry points into tech — no degree required.

### 2. Digital Marketing
Every business needs an online presence. Skills like social media management, SEO (Search Engine Optimization), content creation, and paid advertising are in constant demand.

### 3. Graphic Design & UI/UX
Visual communication is essential. Tools like Canva, Figma, and Adobe Creative Suite open doors to freelance work and full-time positions.

### 4. Content Writing & Copywriting
From blog posts to ad copy, businesses need skilled writers who understand their audience. Good writing combined with SEO knowledge is a powerful combination.

### 5. Basic Programming
Understanding HTML, CSS, JavaScript, or Python opens doors to web development, automation, and data analysis roles.

## Where to Find Opportunities

• **Freelance Platforms** — Upwork, Fiverr, and local platforms connect you with clients worldwide
• **Remote Work** — Many international companies hire remote workers from Africa
• **Evermore Platform** — Our upcoming AI Training Hub will offer paid tasks for data annotation and AI training

## Getting Started

You don't need to master everything at once. Pick one skill, dedicate 30 minutes daily to learning, and build a portfolio of your work. Consistency beats intensity.

## Key Takeaways

The digital economy rewards those who take action. Start with one skill, build real projects, and let your work speak for itself. The opportunity is here — you just need to begin.`,
    quiz: [
      {
        question:
          'What is one of the most accessible entry points into the tech industry?',
        options: [
          'Getting a computer science degree',
          'Data annotation and AI training',
          'Building your own startup',
          'Learning quantum computing',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does SEO stand for?',
        options: [
          'Social Engagement Optimization',
          'Search Engine Optimization',
          'Software Engineering Operations',
          'System Efficiency Output',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the recommended approach to learning digital skills?',
        options: [
          'Learn everything at once',
          'Wait until you can afford a course',
          'Pick one skill, dedicate 30 minutes daily, and build a portfolio',
          'Only learn from university programs',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'how-ai-training-works',
    title: 'How AI Training Works',
    description:
      'Learn what data annotation is, how humans train AI models, and why your input matters.',
    icon: 'cpu',
    pointsReward: 50,
    content: `Behind every smart AI application — from ChatGPT to self-driving cars — there are thousands of humans who helped train it. This process is called data annotation, and it's one of the fastest-growing job categories in the world.

## What is Data Annotation?

Data annotation is the process of labeling data so that AI can learn from it. Think of it like teaching a child to recognize objects: you point at a dog and say "dog." AI learns the same way, but with millions of examples.

## Types of Data Annotation

### Image Annotation
Drawing boxes around objects in photos, identifying faces, or labeling what's in a picture. Used in self-driving cars, medical imaging, and security systems.

### Text Annotation
Classifying text as positive/negative sentiment, identifying named entities (people, places, organizations), or marking grammar errors. Used in chatbots, translation tools, and content moderation.

### Audio Annotation
Transcribing spoken words, identifying speakers, or labeling sounds. Used in voice assistants and speech recognition.

### Video Annotation
Frame-by-frame labeling of objects, actions, and movements. Used in sports analytics, surveillance, and autonomous vehicles.

## Why Humans Are Essential

AI cannot train itself from scratch — it needs human judgment to:
• **Define what's correct** — Only humans can decide if an answer is accurate or appropriate
• **Handle edge cases** — Unusual or ambiguous data requires human intuition
• **Ensure quality** — Human reviewers verify AI outputs and correct mistakes
• **Reduce bias** — Diverse human annotators help create fairer AI systems

## The Opportunity

Major tech companies pay for quality annotation work:
• Tasks range from simple labeling to complex reasoning assessments
• Work can be done remotely from anywhere with internet access
• No prior tech experience is required — training is provided
• Pay rates vary but can range from $3 to $25+ per hour depending on complexity

## Key Takeaways

AI training is a legitimate, growing field that anyone can enter. Your human judgment and attention to detail are valuable skills that AI literally cannot replace. This is what the Evermore AI Training Hub is designed to connect you with.`,
    quiz: [
      {
        question: 'What is data annotation?',
        options: [
          'Writing code for AI systems',
          'Labeling data so AI can learn from it',
          'Building computer hardware',
          'Designing mobile apps',
        ],
        correctIndex: 1,
      },
      {
        question:
          'Why are humans essential in AI training?',
        options: [
          'AI can fully train itself',
          'Humans are cheaper than computers',
          'Only humans can define correctness and handle edge cases',
          'Regulations require it',
        ],
        correctIndex: 2,
      },
      {
        question:
          'Which type of annotation involves drawing boxes around objects in photos?',
        options: [
          'Text annotation',
          'Audio annotation',
          'Image annotation',
          'Video annotation',
        ],
        correctIndex: 2,
      },
      {
        question: 'What prior experience is typically required for data annotation work?',
        options: [
          'A computer science degree',
          'Five years of programming',
          'No prior tech experience — training is provided',
          'An AI certification',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'getting-started-annotation',
    title: 'Getting Started with Data Annotation',
    description:
      'A practical guide to beginning AI training tasks — tools, tips, and what to expect.',
    icon: 'rocket',
    pointsReward: 50,
    content: `Ready to start earning through AI training? This lesson walks you through everything you need to know to begin your first data annotation tasks successfully.

## What You Need

### Equipment
• A computer or smartphone with a stable internet connection
• A modern web browser (Chrome or Edge recommended)
• A quiet environment for audio tasks

### Skills
• Attention to detail — accuracy matters more than speed
• Basic English comprehension
• Ability to follow guidelines precisely
• Patience and consistency

## Your First Task: What to Expect

Most annotation platforms start you with a qualification test or tutorial. Here's a typical workflow:

1. **Read the guidelines** — Every project has specific rules. Read them completely before starting
2. **Complete practice tasks** — Do the tutorial examples carefully
3. **Take the qualification test** — This determines if you can work on paid tasks
4. **Start annotating** — Begin with the actual paid work
5. **Receive feedback** — Your work is reviewed for quality

## Tips for Success

### Do's
✅ Read instructions twice before starting
✅ Take breaks every 45-60 minutes to maintain focus
✅ Ask questions when guidelines are unclear
✅ Track your time and earnings
✅ Build a routine — consistency improves both speed and accuracy

### Don'ts
❌ Don't rush to finish more tasks — quality always beats quantity
❌ Don't guess when you're unsure — skip or ask
❌ Don't work when tired — errors increase and you may get removed
❌ Don't share project details — most tasks require confidentiality

## Quality Metrics

Your work will be evaluated on:
• **Accuracy** — How correct your labels are
• **Consistency** — Are your decisions uniform across similar examples?
• **Speed** — Faster is better, but only when accuracy is maintained
• **Agreement** — How well your annotations match other annotators

## Key Takeaways

Data annotation is a skill that improves with practice. Focus on quality from day one, follow guidelines precisely, and treat it like a professional job. The better your quality scores, the more projects and higher pay you'll unlock.`,
    quiz: [
      {
        question: 'What matters more in data annotation — speed or accuracy?',
        options: [
          'Speed — finish as many tasks as possible',
          'Accuracy — quality always beats quantity',
          'They are equally important',
          'Neither — it depends on the project',
        ],
        correctIndex: 1,
      },
      {
        question: 'What should you do first before starting annotation tasks?',
        options: [
          'Start working immediately to save time',
          'Watch YouTube tutorials',
          'Read the project guidelines completely',
          'Ask other annotators for answers',
        ],
        correctIndex: 2,
      },
      {
        question: 'How often should you take breaks during annotation work?',
        options: [
          'Never — work straight through',
          'Every 10 minutes',
          'Every 45-60 minutes',
          'Only when the platform tells you to',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'building-digital-career',
    title: 'Building Your Digital Career',
    description:
      'Career paths in tech, building a portfolio, and tips for earning remotely.',
    icon: 'briefcase',
    pointsReward: 50,
    content: `The digital economy doesn't care where you live — it cares what you can do. Whether you're in Lagos, Accra, Nairobi, or a small town, you can build a real career online. Here's how.

## Career Paths

### Path 1: AI & Data Professional
Start with data annotation → Learn data analysis (Excel, SQL) → Move into machine learning operations → Become an AI specialist.

### Path 2: Digital Creative
Start with Canva/social media → Learn graphic design (Figma) → Add video editing → Become a creative director or brand strategist.

### Path 3: Developer
Start with HTML/CSS → Learn JavaScript → Build projects → Get hired as a junior developer or freelancer.

### Path 4: Digital Marketer
Start with social media management → Learn SEO and analytics → Master paid advertising → Become a marketing manager.

## Building Your Portfolio

Your portfolio is more important than your degree in the digital economy. Here's how to build one:

1. **Document everything** — Save screenshots, links, and results from every project
2. **Create case studies** — For each project, explain the problem, your approach, and the outcome
3. **Use free platforms** — GitHub for code, Behance for design, Medium for writing
4. **Start a simple website** — Even a one-page site showcasing your work makes you stand out

## Freelancing Tips

### Setting Your Rates
• Research what others in your region charge for similar work
• Start slightly below market rate to build reviews and reputation
• Increase your rates every 3-6 months as your portfolio grows

### Finding Clients
• **Start local** — Offer services to businesses in your area
• **Go online** — Create profiles on Upwork, Fiverr, or Toptal
• **Network** — Join tech communities on Twitter/X, LinkedIn, and Telegram
• **Deliver excellence** — Word of mouth is the best marketing

## Financial Management

• Separate your work income from personal spending
• Save at least 20% of freelance income for taxes and dry periods
• Invest in your tools — a good laptop and internet connection pay for themselves
• Track all expenses related to work — they may be tax-deductible

## Key Takeaways

Building a digital career is a marathon, not a sprint. Start with what you can do today, deliver consistent quality, and let your reputation compound over time. The opportunities are real and growing every year across Africa.`,
    quiz: [
      {
        question:
          'What is more important than a degree in the digital economy?',
        options: [
          'Your location',
          'Your portfolio and proven skills',
          'Your age',
          'The number of certifications you have',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is a good starting strategy for setting freelance rates?',
        options: [
          'Charge the highest rate possible',
          'Work for free to build reputation',
          'Start slightly below market rate and increase every 3-6 months',
          'Match the exact rate of top freelancers',
        ],
        correctIndex: 2,
      },
      {
        question:
          'What percentage of freelance income should you save for taxes and dry periods?',
        options: ['5%', '10%', '20%', '50%'],
        correctIndex: 2,
      },
    ],
  },
];
