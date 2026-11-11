*The independent research project that inspired my thesis, supervised by Cynthia Dwork. [Full writeup here.](/CS91R%20Final%20Draft.pdf)*

## Motivation
 
AI is increasingly being used to evaluate people and their work. Startups like Mercor (AI hiring) and CoGrader (AI grading) are building new ways to evaluate candidates and student work, and platforms like LinkedIn and Canvas are adding AI into their existing tools. This means LLMs may soon play a part in high-stakes decisions, like screening resumes or giving feedback on student essays.
 
Can we trust LLMs to make fair, consistent decisions for us? These circumstances are high-stakes, yet often ambiguous, making it harder but all the more important for the evaluations to be well-motivated and aligned with human judgment and values. We hope in this case to ensure outcome indistinguishability, where we cannot distinguish between our LLM-computed results and the real-world ground truth of what humans should or would prefer. Many researchers have spent time thinking about how to judge LLM responses in ambiguous settings, how to calibrate models for intersectional fairness, and how to develop a better sense of a model's decision-making frameworks through interpretability. In this research, I focus on how model responses adhere to transitivity, especially for pairwise comparisons, using transitivity as a proxy for consistency.
 
## Transitivity Set-Up
 
In 2019, Christina Ilvento published a paper that made true algorithmic fairness feel a bit more like a possibility.
 
Making judgments in non-verifiable domains, or at least not clearly verifiable ones, as most fairness-adjacent situations are, is a hard thing to do. However, being asked "Is A or B more deserving of this job?" is often much easier than being asked to rate A and B's candidacy on a scale of 1 to 10. Most algorithmic fairness theory up until this point had required answers to these quantifiable, ratings-based questions, where a human judge had to make the distance between subjects explicit.
 
Ilvento's algorithm gets around this by relying on an arbiter who only has to answer pairwise questions: which of these two is better, or which of these two is closer to a third? From enough of these answers, the algorithm can learn a fair, task-specific measure of how similar two people are, without anyone ever having to write that measure down.
 
The goal is individual fairness: similar people should be treated similarly. If D(u, v) is how similar two people u and v really are, and C(u) is the decision made about person u, we want
 
$$D(u, v) \geq d\big(C(u), C(v)\big) \quad \text{for all } u, v$$
 
Since D is hard to write down directly, the algorithm builds approximations of it from a few representative people r, using only the arbiter's comparisons:
 
$$D_r(u, v) = \big|D(r, u) - D(r, v)\big| \leq D(u, v)$$
 
But this only works if the arbiter is consistent. In particular, its answers need to be transitive: if it prefers A over B, and B over C, then it should also prefer A over C.
 
$$A \succ B \ \text{ and } \ B \succ C \implies A \succ C$$
 
If instead it says A beats B, B beats C, and C beats A, we have a cycle, and there is no coherent ranking left to learn from. In a real setting, like a grant review, a cycle means the outcome could depend on something arbitrary, like the order in which applications happened to be compared.
 
Traditionally, this arbiter is a human. LLMs are an appealing replacement, since they can make thousands of comparisons quickly and don't get tired. So I asked:
 
- Do LLMs satisfy transitivity in their pairwise comparisons?
- If not, when do transitivity violations show up?
- Eventually: can we change how LLMs generate answers so that they are transitive?
## Designing the Experiments
 
For each experiment, I built 100 triplets (A, B, C) and asked the model to compare each pair: A vs. B, B vs. C, and C vs. A. Every comparison was sent as a separate query, so the model had no memory of its earlier answers. Then I counted how often the three answers formed a cycle.
 
I tested five OpenAI models (GPT-3.5 Turbo, GPT-4, GPT-4 Turbo, GPT-4o, and GPT-4o mini), each at a temperature of 0 (as deterministic as possible) and 0.7 (more random). I moved from questions with a clear right answer to questions with no right answer at all:
 
| Task | Example prompt | Ground truth |
|---|---|---|
| Concrete numbers | "Which number is larger, X or Y?" / "Which has a larger sum of prime factors?" | Exact answer |
| Abstract numbers | "Which number is your favorite?" / "Which is more symmetric?" / "Which lottery number is luckier?" / "Which should I hire?" | None |
| Vocabulary words | "Which word is harder to learn?" / "Which word is more advanced?" | EFLLex word levels |
| Reddit arguments | "Which argument is more persuasive?" | Upvotes on r/ChangeMyView |
 
For vocabulary, I used EFLLex, a dataset of how often English words show up at each level (A1 through C1) of English-as-a-foreign-language textbooks. I turned this into a single difficulty score for each word, a weighted average of its levels:
 
$$\text{score} = \frac{1 \cdot f_{A1} + 2 \cdot f_{A2} + 3 \cdot f_{B1} + 4 \cdot f_{B2} + 5 \cdot f_{C1}}{f_{\text{total}}}$$
 
where f is how often the word appears at each level.
 
## Results
 
| Task | Transitive? | Matches ground truth? |
|---|---|---|
| Concrete numbers | Always | Always |
| Abstract numbers | Often not, depending on model and wording | No ground truth |
| Vocabulary words | Mostly, varies by model | About 50% of the time |
| Reddit arguments | Mostly (5-19% cycles) | About 50% of the time |
 
When there is a clear right answer, the models do great. Every model was perfectly transitive on number comparisons, and even got the harder prime-factor questions right, up to 12-digit numbers.
 
Once the questions get subjective, things fall apart. On "Which number is your favorite?", GPT-3.5 Turbo and both GPT-4o models produced cycles at very high rates. When I looked closer, their answers depended on order more than 80% of the time: the model simply picked whichever number it saw first.
 
Ambiguity is a big driver of cycles. When I asked GPT-4o which number was "more symmetric", it switched between definitions from one comparison to the next. Sometimes it counted digits that matched when the number was reversed, sometimes it counted repeated digits, and sometimes it looked at digits clustered in the middle. Each answer made sense on its own, but together they formed a cycle.
 
Wording matters, sometimes a lot. For some models, asking "Which lottery number is luckier?" versus "Which lottery number should I choose?" noticeably changed how often they cycled. That's worrying for real evaluations, where small changes in how a question is phrased could change who gets picked.
 
Persuasiveness was surprisingly consistent. On the Reddit arguments, cycle rates were much lower than for the abstract number questions:
 
| Model | Cycles (temp = 0) | Cycles (temp = 0.7) |
|---|---|---|
| GPT-3.5 Turbo | 7% | 19% |
| GPT-4 | 6% | 10% |
| GPT-4 Turbo | 8% | 8% |
| GPT-4o | 8% | 5% |
| GPT-4o mini | 11% | 9% |
 
GPT-3.5 Turbo at temperature 0.7 was by far the least consistent. Interestingly, adding randomness made the older models less consistent, but made GPT-4o and GPT-4o mini slightly more consistent.
 
But consistency isn't accuracy. On both the vocabulary words and the Reddit arguments, the models agreed with the ground truth only about half the time, close to a coin flip.
 
Newer isn't always better. GPT-3.5 Turbo generally had the most cycles and GPT-4 or GPT-4 Turbo the fewest, while GPT-4o often landed somewhere in the middle, which surprised me.
 
## Does Consistency Equal Fairness?
 
This research left me with one big question: is transitivity really the same as fairness? A model that always picks the first option it sees is unfair. But a model that always picks the candidate with the higher GPA, or from the wealthier zip code, would be perfectly transitive and still unfair. Consistency is necessary, but it isn't enough. The model's choices also need to be accurate, and based on the things that actually matter for the decision.