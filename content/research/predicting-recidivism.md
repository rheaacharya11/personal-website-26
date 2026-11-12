*(A mathematics project, collaborated on with Karen Song. [Link here](/predicting-recidivism.pdf))*

## Recidivism and Mental Health

Sociology is the study of human behavior within the context of social relationships, institutions, and systems. Through this project, we wanted to study how linear algebra can be applied to one area of focus in sociology: the prison system, and specifically how to predict recidivism, the chance that someone who committed an offense will re-offend. In particular, we were interested in how mental health can affect these recidivism rates.

In a survey conducted by the US Bureau of Justice Statistics, an estimated 56% of state prisoners and 64% of jail inmates reported symptoms of mental health disorders or had a recent history of mental health problems. Repeated encounters with the criminal justice system are also more common among people with a mental health problem: about 25% had served three or more prior incarcerations, compared to around 20% among those without.

Given that the US has the largest prison population in the world, and that its prison system continues to be the subject of controversy and debate, we decided to study this issue through the quantitative lens offered by linear algebra. Overall, we hoped our project could inform a greater understanding of the importance of adequate and continued mental health treatment for offenders, both incarcerated and released.

## Markov Chains

To study recidivism, we used Markov chains, which model sequences of events where the probability of an outcome depends on the outcome that came directly before it. We represent the population at each step as a probability vector x, and a stochastic matrix P tells us how people move between states from one step to the next:

$$x_{k+1} = P x_k$$

Markov chains can be useful for predicting what will happen in the short term, but they are especially useful for modeling long-term trends. Often, as we look further into the future, the state vectors steadily approach a certain vector, known as the steady-state vector q. Once this vector has been reached, multiplying by P gives back the same vector, so the distribution of the population stops changing:

$$Pq = q$$

In other words, q is an eigenvector of P with eigenvalue 1. In our paper, we use the Perron-Frobenius Theorem to prove that if P is a regular stochastic matrix, this steady-state vector exists, is unique, and that the Markov chain will always converge to it, no matter where the population starts.

## Building the Model

We followed a similar framework to Lin et al. (2014), who used a Markov model to study schizophrenia patients recently released from jail. However, rather than focusing on the economic costs of treatment, we focused on predicting recidivism based on mental health status at release. We used data from the Florida Department of Corrections 2020-2021 Recidivism Report, and assumed that a person could be in one of four states:

| State | Meaning |
|---|---|
| J, MH | In jail, requiring mental health treatment |
| J, NMH | In jail, not requiring mental health treatment |
| C, MH | In the community, requiring mental health treatment |
| C, NMH | In the community, not requiring mental health treatment |

To fill in the transition matrix, we combined the Florida data with other research:

| Assumption | Value | Source |
|---|---|---|
| Chance of being released from jail each step | 24.4% | Florida 2017-18 admissions and releases |
| Recidivism rate, not requiring treatment | 22.46% | Florida recidivism report |
| Recidivism rate, requiring treatment | 28.51% | Florida recidivism report |
| Chance of developing a mental illness after release | 30% | Van den Berg et al. (2016) |

We also assumed that mental health status stays the same while someone is in jail. Putting this together, we got the following transition matrix, where each column shows where people in that state end up at the next step:

$$
P = \begin{pmatrix}
.756 & 0 & .285 & .101 \\
0 & .756 & 0 & .123 \\
.244 & 0 & .715(1-m) & .233 \\
0 & .244 & .715\,m & .543
\end{pmatrix}
$$

Here, m represents the effectiveness of mental health treatment after release, or the percentage of released inmates who require treatment but no longer need it three years later. We set this as a variable so that we could measure how improving treatment changes the long-term outcomes.

## Results

We started with the 33,886 people in Florida's 2017-2018 data, and solved for the steady-state vector by row reducing (I - P)q = 0, under two levels of treatment effectiveness:

| State | Treatment effectiveness m = 40% | Treatment effectiveness m = 60% |
|---|---|---|
| In jail, requiring treatment | 13,555 | 12,436 |
| In jail, not requiring treatment | 3,829 | 4,744 |
| In the community, requiring treatment | 8,878 | 7,319 |
| In the community, not requiring treatment | 7,624 | 9,386 |

When the effectiveness of mental health treatment rose from 40% to 60%, approximately 2,000 more people ended up in the community long-term without needing ongoing treatment, which is the ideal state out of the four. The number of people in jail also went down slightly. Especially when scaled up beyond the state of Florida, these findings show that increasing the effectiveness of mental health treatment in the community can have a significant positive impact.

## Looking Ahead

Our model is a simplified picture of a complex system. Due to a lack of available data, some of the percentages in our transition matrix are estimates based on related research. In the future, we would like to build a more robust model that takes into account more factors that affect recidivism, such as age at release, geographic environment, and criminal history.

Through working on this project, we learned that there needs to be more research and data collected on the mental health of inmates: how many develop symptoms while incarcerated, how their mental health changes after release, and how this factors into recidivism. Ultimately, we hope to see more research in this area, so that inmates can have a healthier transition back into the community.
