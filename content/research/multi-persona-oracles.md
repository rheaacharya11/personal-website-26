*My senior undergraduate honors thesis from Harvard, supervised by Ariel Procaccia (officially) and Cynthia Dwork (unofficially). [Full paper here.](https://dash.harvard.edu/entities/publication/bf041f84-e535-4d2f-b7bb-0488eb182271)*

## What Modern Fairness Gets Wrong

Algorithms have quietly embedded themselves into the fabric of daily life. They help determine whose résumé is reviewed by a recruiter, who qualifies for a loan, how long someone remains incarcerated, and which patients receive urgent care. Once considered neutral tools —efficient, data-driven, impartial— they are now recognized as powerful arbiters of opportunity and harm.

How can we ensure that these algorithms are fair? Most modern-day fairness theory presumes the existence of a perfectly fair human judge, who can assess pairwise comparisons to show algorithms how to handle situations, much like RLHF. However, it seems not only impractical for this fair human to be able to provide feedback efficiently on so many situations, but fairness seems more accurately defined as a pluralistic value rather than an entity with a ground truth.

## My Contribution

My thesis proposes the Multi-Persona Oracle: instead of one ideal judge, a collection of personas with different fairness perspectives provide pairwise comparisons, and no-regret learning aggregates them into a classifier that reflects the full landscape of what "fair" might mean. See the results and further setup in the [full paper](https://dash.harvard.edu/entities/publication/bf041f84-e535-4d2f-b7bb-0488eb182271).

![](/Thesis_Image.png)
*The Multi-Persona Oracle aggregates pairwise comparisons across personas using no-regret learning to produce a fair classifier.*
