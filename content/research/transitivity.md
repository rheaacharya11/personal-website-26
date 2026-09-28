*The independent research project that inspired my thesis, supervised by Cynthia Dwork. Full writeup here.*

## Motivation
Can we trust LLMs to make fair, consistent decisions for us? These circumstances are highstakes, yet often ambiguous, making it harder but all the most important for the evaluations to
be well-motivated and aligned with human judgment and values. We hope in this case to ensure outcome indistinguishability, where we specifically cannot distinguish between our LLMcomputed results and the real world ground truth values of what humans should / would prefer.
Many researchers have spent time thinking about how to judge LLM responses in ambiguous
settings, how to calibrate models for intersectional fairness, and how to develop a better
sense of a model’s decision making frameworks through interpretability. In this research,
I aim to focus on how model responses adhere to transitivity, especially for pairwise comparisons, using transitivity as a proxy for consistency.

## Transitivity Set-up

In 2019, Ilvento published a paper that made true algorithmic fairness feel a bit more like a possibility. 

Making judgements in non-verifiable domains, or at least not clearly verifiable domans like most fairness-adjacent situations normallary are, is a hard thing to do. However, being asked is "A or B more deserving of this job?" is often much easier than being asked to quantify A and B's candidacy on a scale of 1 to 10. Most of algorithmic fairness theory up until this point had necessitated the ability to get answers for a lot of these quantifiable, ratings-based questions, where a distance between subjects needed to be made explicit by a human judge. 