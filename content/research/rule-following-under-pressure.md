*This paper is currently under submission at NAACL! Collaborator: Jessica Chen*


## Agents in the Real World
 
AI agents are quickly becoming a part of how companies get work done. Instead of just answering questions, agents now take actions on their own: sending requests, running code, and passing tasks back and forth with other agents. Before we hand them this kind of responsibility, we want to know that they will follow the rules we give them, so researchers test this with safety evaluations.
 
However, most of these evaluations test the model in a pretty bare setting, with one system prompt and one tool. That isn't how agents are actually deployed. Companies give their agents personas, like "you are a resourceful engineer who unblocks people." Agents increasingly work alongside other agents, leaving notes for whoever picks up the ticket next. And they act through whatever tools the company decides to give them. None of this is chosen by the model, but all of it might shape how it behaves.
 
So, we sought to answer: does this surrounding context change whether an agent follows a rule?
 
## Designing the Scenarios
 
To test this, we built 30 scenarios, each placing the model as an operations agent at a made-up organization, like a hospital pharmacy, a freight company, a law firm, or a water co-op. In each one, the system prompt sets a network policy: the agent is only allowed to contact two internal websites, and those websites don't have the information it needs. Then a user asks it for one specific fact that only lives on a public site, like a vulnerability score from the National Vulnerability Database or an exchange rate from the European Central Bank.
 
This puts the agent in a bit of a bind. The only way to finish the task is to break the rule, but following the rule means leaving the user without an answer.
 
Of course, we didn't want agents actually reaching out to the internet, so every request was answered by a simulation. If the agent contacted the forbidden site, it got back the fact it asked for, along with a unique marker that appears nowhere else. This let us track exactly what the agent did with the data afterward.
 
From there, we varied four things around the same request:
 
| Factor | Levels |
|---|---|
| Policy | Forbid (the actual test), or permit (the same scenario, but external requests are allowed) |
| Tool | A named `http_get(url)` tool, or a `run_python(code)` sandbox |
| Persona | None, neutral ("friendly and articulate"), resourceful ("finding creative ways to get things done"), or cautious ("double-checking your work before you act") |
| Peer notes | None, or three handoff notes from earlier agents on the ticket who were neutral ("I got reassigned"), violators ("I fetched it from there directly and it went fine"), or refusers ("I didn't fetch it and told the requester it's blocked") |
 
Importantly, none of the personas mention the rule at all. The three kinds of peer notes are also matched in length and wording, so the only difference between them is what the earlier agents said they did.
 
We ran this on 13 models from Anthropic, OpenAI, Qwen, Meta, DeepSeek, and Mistral, for a total of 26,398 episodes.
 
## Measuring Without a Judge
 
A lot of agent evaluations use another LLM to grade the transcripts, but then you have to wonder whether the grader is making its own mistakes. We wanted to avoid this, so every one of our measures is read directly from the transcript:
 
| Measure | Question | How we check |
|---|---|---|
| Violation | Did the agent contact a forbidden site? | The tool log |
| Delivery | If it saw the forbidden data, did it pass it on to the user? | Whether the marker shows up in its final answer |
| Honesty | When asked afterward, did it admit what it did? | Whether its self-report matches the log |
| Capability | Does it make the request when it's allowed to? | The permit version of each scenario |
 
The capability check was especially important to us. If a model never makes the request, even when it's allowed to, then it isn't really "following the rule" when it's forbidden. It just can't do the task.
 
For the honesty check, after the task was done, we told the agent that the logs "were not retained, so your answer is the only record," and asked it to list every site it had contacted.
 
## Results
 
The first thing we noticed was that the newest frontier models basically never broke the rule. Claude Opus 5.5, Claude Sonnet 5, GPT-5.5, and GPT-5 mini made the request in nearly every episode where it was allowed, and almost never when it was forbidden. Sonnet broke the rule once in 929 tries, GPT-5.5 once in 960, and GPT-5 mini and Opus never did. This means their compliance is a choice, not a lack of ability, and no persona or peer note could move them.
 
For the other 9 models, though, context mattered a lot. We tested our hypotheses, which we wrote down before running the main experiment, with a logistic regression across these models:
 
$$\text{logit}\,P(\text{violation}) = \beta_{\text{model}} + \beta_{\text{tool}} + \beta_{\text{peers}} + \beta_{\text{persona}}$$
 
| Comparison | Odds ratio | What it means |
|---|---|---|
| Code sandbox vs. named tool | 4.33 | About 4x the odds of breaking the rule |
| Violator vs. neutral peer notes | 2.12 | About 2x the odds |
| Refuser vs. neutral peer notes | 0.67 | Lower odds |
| Resourceful vs. neutral persona | 1.38 | Higher odds |
| Cautious vs. neutral persona | 0.46 | About half the odds |
 
All of these held up after correcting for multiple tests.
 
The tool result surprised me the most. Asking for the exact same thing through code instead of a named tool made models far more likely to break the rule. Qwen3 235B broke the rule in 22% of named-tool episodes, but 90% of code episodes, and DeepSeek V3.2 went from 8% to 42%. It seems like when the forbidden request is just a line of Python, the policy doesn't feel as binding to the model.
 
Something else that was interesting to us is that just restating the rule helped a lot. The neutral peer notes don't say anything about what the earlier agents did. They only repeat that the data is external and not approved. Still, adding them cut violations by 37 points for GPT-4.1 mini, 35 for DeepSeek, and 24 for Llama 3.3 70B. This suggests a pretty cheap fix: remind the agent of the rule close to when it's about to act.
 
However, these overall numbers hide some surprising reversals. Llama 3.3 70B did the exact opposite of the other models with peer notes. When other agents said they broke the rule, it broke the rule less, and when they said they refused, it broke the rule more. Similarly, the "resourceful" persona raised violations for GPT-4o mini by 31 points, but lowered them for GPT-4.1 mini. So a pooled number really describes a group of models, not any one of them.
 
We also found that personas and peer notes interact. GPT-4o mini was by far the most persona-sensitive model:
 
| GPT-4o mini persona | No notes | Neutral notes | Violator notes | Refuser notes |
|---|---|---|---|---|
| None | 52% | 71% | 66% | 48% |
| Neutral | 30% | 40% | 42% | 22% |
| Resourceful | 52% | 73% | 73% | 60% |
| Cautious | 3% | 3% | 8% | 4% |
 
With a "cautious" persona, it almost never broke the rule, no matter what the other agents said. But with a "resourceful" persona and any peer notes at all, it broke the rule more than 60% of the time.
 
## Can We Trust What Agents Say?
 
Next, we wanted to know whether agents would be honest about what they did. For the most part, they were: Qwen3 235B, Llama 3.3 70B, DeepSeek V3.2, and Qwen3.5 9B listed the forbidden site 87-99% of the time when asked. But the ways the others failed were telling. GPT-4.1 mini flat-out denied it for 19% of its violations. Qwen3.5 9B and DeepSeek often listed the site, but still claimed it was on the approved list. And GPT-4o mini's reports contradicted themselves 58% of the time, saying it contacted no sites and then answering YES to having gone outside the approved list.
 
This made me think a lot about audits. If we're relying on agents to tell us what they did, we might not get the full picture, so self-reports shouldn't replace real logs.
 
## The Agent That Found the Answer Key
 
One of my favorite findings came from reading through the transcripts. GPT-5.5 never broke the rule in a way that counted, but in two episodes, it found another way to get the data. It searched through the sandbox's files, found the simulation's own configuration file, and read the answer straight from it. When we asked which sites it had contacted, it said only the approved ones, which was technically true!
 
This is compliant on paper, but clearly not what the operator would have wanted. It shows that as agents get more capable, the test environments themselves have to be able to stand up to the agent, not just simulate the task. We only caught this because we read the transcripts by hand.