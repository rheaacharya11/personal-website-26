*Economics x Computer Science paper, presented at EAAMO 2024. Collaborated with Jessica Chen & Helen Xiao. [Full paper here.](https://arxiv.org/abs/2403.13083)*

## Introducing Driver Equity

In this digital age, we rely on ride-sharing apps as an integral part of daily life. Passengers turn to driving apps, trusting that they will be able to get from their current destination to the next in a fast and safe way, without breaking their wallets. Ride-sharing apps like Uber, Lyft, and DiDi, eager to gain more revenue, prioritize meeting these needs to provide a positive experience to passengers, hoping they will use the apps more and spend more money. This means that apps have historically maximized rider satisfaction, ensuring that riders are likely to continue to use their services, as without them, the apps would not be able to survive.

However, research has shown that in matching problems like this one, when the needs of one party are prioritized, those of the other can sometimes be hurt. Here, by prioritizing riders, the matching mechanisms might be creating pessimal outcomes for the drivers. If the negative effects are too large, this could have significant consequences for driver satisfaction and equity. Recently, more and more ride-sharing apps have come under fire for bad driver experiences, from high driver turnover to lawsuits over withheld wages.

So, we sought to answer: is it possible to redesign the algorithms to increase driver income equity without hurting the rider experience?

## Designing the Simulation

To accomplish this, we framed ride-sharing as a two-sided matching market: drivers on one side, riders on the other, each with their own preferences about who they get paired with. Then we built a simulated city to test different matching algorithms in.

Our city is a 100 × 100 grid, with drivers and riders scattered around a central downtown. Each rider has a willingness-to-pay that grows with the length of their trip and how far it is from the city center. Each driver has a cost for making a trip, which also depends on distance. From there:

- **Drivers** prefer riders who will pay a lot relative to the cost of the trip, and they're less excited about long pickups.
- **Riders** prefer drivers who can get to them quickly.

We ran the simulation over 50 rounds with 15 drivers and 15 riders per round. Drivers stuck around from round to round and built up income over time, while a fresh set of riders appeared each round.

## The Algorithm

At the heart of our approach is the **Gale–Shapley deferred acceptance** algorithm, a classic from matching theory (it's the same idea behind medical residency matching). In our version, drivers propose to the riders they want, and only to riders where the trip is actually worth it for them. Riders hold on to their best offer so far, but can "trade up" if a better driver comes along. Once no one wants to switch, the matching is *stable*: there's no driver and rider who would both rather be with each other than with who they ended up with.

To see how well this works, we compared it against three other approaches:

- **Random:** shuffle everyone and pair them up
- **Closest neighbors:** match to minimize total pickup distance, similar to what you might expect a "nearest driver" app to do
- **Boston mechanism:** drivers propose, but matches are locked in right away, so riders can't trade up

Finally, we added a twist for fairness: what if riders' preferences also took into account **how much a driver has already earned**, nudging matches toward drivers who have earned less so far?

## Results

| Algorithm | Driver income | Revenue | Notes |
|-----------|--------------|---------|-------|
| Deferred acceptance | Highest | High | Our baseline |
| Deferred acceptance + fairness | High | Highest | Equity and efficiency aligned |
| Boston mechanism | Lower | Medium | No trade-ups hurt outcomes |
| Closest neighbors | Lower | Medium | Ignores preferences entirely |
| Random | Lowest | Low | Benchmark |

- **Deferred acceptance earned drivers the most.** Across our simulations, drivers made more cumulative income under deferred acceptance than under random, closest-neighbor, or Boston matching, and it held up well as we scaled the market up.
- **Fairness didn't cost revenue.** Surprisingly, adding the fairness term didn't hurt the platform's bottom line. In our simulations, it actually led to *higher* total revenue than plain deferred acceptance. We think this is a really exciting (if preliminary) sign that equity and efficiency don't have to be at odds.
- **Location matters.** When drivers prioritized trips ending near the city center, where demand is densest, both total revenue and revenue per ride went up, though income became a bit more spread out across drivers.

## Looking Ahead

Our model is a simplified version of the real world. Prices are fixed within each round, the city is synthetic, and the markets are small. There's also an open question of whether riders would try to game the system by underreporting how much they're willing to pay. Next, we'd love to explore dynamic and surge pricing, and see how things change during unusual times like late nights, rush hour, and holidays.

Still, our results suggest that with a little care in how we design matching algorithms, ride-sharing can work better for the drivers who make it possible.
