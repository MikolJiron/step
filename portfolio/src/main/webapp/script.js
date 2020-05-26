// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomQuote() {
  const quotes =
      ['"Face it, Jared, being too early is the same as being wrong.” - Richard',
       '"Look, guys, for thousands of years, guys like us have gotten the shit kicked out of us. But now, for the first time, we’re living in an era, \
        where we can be in charge and build empires. We could be the Vikings of our day." - Richard', 
        '“Why do people covet the silly pieces of green cotton paper in their wallets? \
        It’s because we are all sheep. And we’ve mutually agreed to endow certain things with value.” - Gilfoyle',
         '“It’s not magic. It’s talent and sweat.” - Gilfoyle',
         '“Just cause making the box sucks doesn’t mean we have to suck at making it.” - Dinesh',
         '“Time is a sphere, and I have been reincarnated in the same time at which I exist!” - Erlich',
          '“I don’t know about you people, but I don’t want to live in a world where someone else makes the world a better place better than we do.”-Gavin Belson', 
          '“Failure is growth. Failure is learning. But sometimes failure is just failure.” - Gavin Belson', 
          '“The word companion derives from the Latin word “panis” for bread, and while I can no longer digest bread, I know that you leaven my life.” - Jared',
          '“Richard, adversity is a great teacher. Just like cigarette burns.” - Jared', 
          '“People don’t wanna follow an idea, they wanna follow a leader.” - Jared',
          '“Question for you. What’s better than an octopus recipe? Answer for you. Eight recipes for octopus.” - Jian-Yang',
          '“I love my Tesla. It has Insane Mode, which means it goes zero to 60 in 3.2 seconds, which is literally insane. But the Tesla that Danny ordered has Ludicrous Mode,\
           which means it goes zero to 60 in 2.8 seconds. So it\'s gonna take me an entire 0.4 seconds longer to get to 60. I mean, how would you feel if one of your neighbors \
           got a tiki head bigger than yours?” - Dinesh', 
          '“That was an out-of-body experience. It was like God was coding through me. Time stood still." - Dinesh', 
          '"If the rise of an all-powerful artificial intelligence is inevitable, well it stands to reason that when they take power, our digital overlords will punish those of us\
           who did not help them get there. Ergo, I would like to be a helpful idiot. Like yourself." - Gilfoyle', 
           'Waiter: "Are you enjoying your asparagus, sir?" \
           Peter Gregory: "I was never enjoying it. I only eat it for the nutrients."'];

  // Pick a random greeting.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Add it to the page.
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}
