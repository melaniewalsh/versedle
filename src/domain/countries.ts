// Source:
// Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
// Countries images => https://github.com/djaiss/mapsicon
import { flag } from "country-emoji";
import i18n from "../i18n";

export interface Country {
  code: string;
  latitude: number;
  longitude: number;
  birth_year: number;
  first_line: string;
  name: string;
  oecCode?: string;
  title: string;
}

export const countries: Country[] = [
  {
    name: "Maya Angelou",
    first_line:
      "Leaving behind nights of terror and fear\nI rise\nInto a daybreak that’s wondrously clear\nI rise\nBringing the gifts that my ancestors gave,\nI am the dream and the hope of the slave.\nI rise\nI rise\nI rise.",
    latitude: 33.93911,
    longitude: 67.709953,
    title: "Still I Rise",
    birth_year: 1928,
    code: "MA",
  },
  {
    name: "W.H. Auden",
    first_line:
      "Stop all the clocks, cut off the telephone,\nPrevent the dog from barking with a juicy bone,\nSilence the pianos and with muffled drum\nBring out the coffin, let the mourners come.\n\nLet aeroplanes circle moaning overhead\nScribbling on the sky the message He Is Dead\nPut crepe bows round the white necks of the public doves,\nLet the traffic policemen wear black cotton gloves.\n\nHe was my North, my South, my East and West,\nMy working week and my Sunday rest,\nMy noon, my midnight, my talk, my song;\nI thought that love would last for ever: I was wrong.",
    latitude: 33.93911,
    longitude: 67.709953,
    title: "Twelve Songs: IX",
    birth_year: 1907,
    code: "AU",
  },
  {
    name: "W.H. Auden",
    first_line:
      "About suffering they were never wrong,\nThe Old Masters: how well they understood\nIts human position; how it takes place\nWhile someone else is eating or opening a window or just walking dully along\n\nHow, when the aged are reverently, passionately waiting\nFor the miraculous birth, there always must be\nChildren who did not specially want it to happen, skating\nOn a pond at the edge of the wood:\nThey never forgot\nThat even the dreadful martyrdom must run its course\nAnyhow in a corner, some untidy spot\nWhere the dogs go on with their doggy life and the torturer's horse\nScratches its innocent behind on a tree.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Musée des Beaux Arts",
    birth_year: 1907,
    code: "WH",
  },
  {
    name: "Jane Austen",
    first_line:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.\n"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"\nMr. Bennet replied that he had not.\n"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."\nMr. Bennet made no answer.',
    latitude: 33.93911,
    longitude: 67.709953,
    title: "Pride and Prejudice",
    birth_year: 1775,
    code: "AF",
  },
  {
    name: "Elizabeth Bishop",
    first_line:
      "The art of losing isn’t hard to master;\nso many things seem filled with the intent\nto be lost that their loss is no disaster.\n\nLose something every day. Accept the fluster\nof lost door keys, the hour badly spent.\nThe art of losing isn’t hard to master.\n\nThen practice losing farther, losing faster:\nplaces, and names, and where it was you meant\nto travel. None of these will bring disaster.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "One Art",
    birth_year: 1911,
    code: "EB",
  },
  {
    name: "William Blake",
    first_line:
      "Tyger Tyger, burning bright,\nIn the forests of the night;\nWhat immortal hand or eye,\nCould frame thy fearful symmetry?\nIn what distant deeps or skies.\nBurnt the fire of thine eyes?\nOn what wings dare he aspire?\nWhat the hand, dare seize the fire?",
    latitude: 33.93911,
    longitude: 67.709953,
    title: "The Tyger",
    birth_year: 1757,
    code: "WB",
  },
  {
    name: "William Blake",
    first_line:
      "Little Lamb who made thee \n         Dost thou know who made thee \nGave thee life & bid thee feed. \nBy the stream & o'er the mead;\nGave thee clothing of delight,\nSoftest clothing wooly bright;\nGave thee such a tender voice,\nMaking all the vales rejoice!",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Lamb",
    birth_year: 1757,
    code: "WBL",
  },
  {
    name: "Anne Bradstreet",
    first_line:
      "If ever two were one, then surely we.\nIf ever man were loved by wife, then thee.\nIf ever wife was happy in a man,\nCompare with me, ye women, if you can.\nI prize thy love more than whole mines of gold,\nOr all the riches that the East doth hold.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "To my dear and loving husband",
    birth_year: 1612,
    code: "AB",
  },
  {
    name: "Gwendolyn Brooks",
    first_line:
      "We real cool. We   \nLeft school. We\n\nLurk late. We\nStrike straight. We\n\nSing sin. We   \nThin gin. We\n\nJazz June. We   \nDie soon.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "We Real Cool",
    birth_year: 1917,
    code: "GB",
  },
  {
    name: "Gwendolyn Brooks",
    first_line:
      "They eat beans mostly, this old yellow pair.   \nDinner is a casual affair.\nPlain chipware on a plain and creaking wood,   \nTin flatware.\n\nTwo who are Mostly Good.\nTwo who have lived their day,\nBut keep on putting on their clothes   \nAnd putting things away.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Bean Eaters",
    birth_year: 1917,
    code: "BG",
  },
  {
    name: "Elizabeth Barrett Browning",
    first_line:
      "How do I love thee? Let me count the ways.\nI love thee to the depth and breadth and height\nMy soul can reach, when feeling out of sight\nFor the ends of being and ideal grace.\nI love thee to the level of every day’s\nMost quiet need, by sun and candle-light.\nI love thee freely, as men strive for right.\nI love thee purely, as they turn from praise.\nI love thee with the passion put to use\nIn my old griefs, and with my childhood’s faith.\nI love thee with a love I seemed to lose\nWith my lost saints. I love thee with the breath,\nSmiles, tears, of all my life; and, if God choose,\nI shall but love thee better after death.",
    latitude: 33.93911,
    longitude: 67.709953,
    title: "How Do I Love Thee? (Sonnet 43)",
    birth_year: 1806,
    code: "EB",
  },
  {
    name: "Robert Browning",
    first_line:
      "That’s my last Duchess painted on the wall,\nLooking as if she were alive. I call\nThat piece a wonder, now; Fra Pandolf’s hands\nWorked busily a day, and there she stands.\nWill’t please you sit and look at her? I said\n“Fra Pandolf” by design, for never read\nStrangers like you that pictured countenance,\nThe depth and passion of its earnest glance,\nBut to myself they turned (since none puts by\nThe curtain I have drawn for you, but I)",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "My Last Duchess",
    birth_year: 1812,
    code: "RB",
  },
  {
    name: "Charles Bukowski",
    first_line:
      "there’s a bluebird in my heart that \nwants to get out \nbut I’m too tough for him, \nI say, stay in there, I’m not going \nto let anybody see \nyou. \n\nthere’s a bluebird in my heart \nthat wants to get out \nbut I pour whiskey on him and inhale \ncigarette smoke \nand the whores and the bartenders \nand the grocery clerks \nnever know that \nhe’s \nin there.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "bluebird",
    birth_year: 1920,
    code: "CB",
  },
  {
    name: "Lord Byron",
    first_line:
      "She walks in beauty, like the night\nOf cloudless climes and starry skies;\nAnd all that’s best of dark and bright\nMeet in her aspect and her eyes;\nThus mellowed to that tender light\nWhich heaven to gaudy day denies.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "She Walks in Beauty",
    birth_year: 1788,
    code: "LB",
  },

  {
    name: "Lewis Carroll",
    first_line:
      "’Twas brillig, and the slithy toves\n      Did gyre and gimble in the wabe:\nAll mimsy were the borogoves,\n      And the mome raths outgrabe.\n\n“Beware the Jabberwock, my son!\n      The jaws that bite, the claws that catch!",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Jabberwocky",
    birth_year: 1832,
    code: "LC",
  },
  {
    name: "Geoffrey Chaucer",
    first_line:
      "Whan that Aprille with his shoures soote,\nThe droghte of March hath perced to the roote,\nAnd bathed every veyne in swich licóur\nOf which vertú engendred is the flour;\nWhan Zephirus eek with his swete breeth\nInspired hath in every holt and heeth\nThe tendre croppes, and the yonge sonne\nHath in the Ram his halfe cours y-ronne,",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Canterbury Tales, Prologue",
    birth_year: 1340,
    code: "GC",
  },
  {
    name: "Billy Collins",
    first_line:
      "But for now I am a willing prisoner in this house,\na sympathizer with the anarchic cause of snow.\nI will make a pot of tea\nand listen to the plastic radio on the counter,\nas glad as anyone to hear the news\nthat the Kiddie Corner School is closed,\nthe Ding-Dong School, closed.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Snow Day",
    birth_year: 1941,
    code: "BC",
  },
  {
    name: "E.E. Cummings",
    first_line:
      "little tree\nlittle silent Christmas tree\nyou are so little\nyou are more like a flower\nwho found you in the green forest\nand were you very sorry to come away?\nsee          i will comfort you\nbecause you smell so sweetly\n\ni will kiss your cool bark\nand hug you safe and tight\njust as your mother would,",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "[little tree]",
    birth_year: 1894,
    code: "EE",
  },
  {
    name: "E.E. Cummings",
    first_line:
      "anyone lived in a pretty how town\n(with up so floating many bells down)\nspring summer autumn winter\nhe sang his didn’t he danced his did.\n\nWomen and men(both little and small)\ncared for anyone not at all",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "anyone lived in a pretty how town",
    birth_year: 1894,
    code: "EC",
  },
  {
    name: "Don Delillo",
    first_line:
      "The station wagons arrived at noon, a long shining line that coursed through the west campus.\n    In single file they eased around the orange I-beam sculpture and moved toward the dormitories.\n    The roofs of the station wagons were loaded down with carefully secured suitcases full of light and heavy clothing;\n    with boxes of blankets, boots and shoes, stationery and books, sheets, pillows, quilts; with rolled-up rugs and sleeping bags;\n    with bicycles, skis, rucksacks, English and Western saddles, inflated rafts.\n    As cars slowed to a crawl and stopped, students sprang out and raced to the rear doors to begin removing the objects inside; the stereo sets, radios, personal computers; small refrigerators and table ranges; the cartons of phonograph records and cassettes; the hairdryers and styling irons;\n    the tennis rackets, soccer balls, hockey and lacrosse sticks, bows and arrows; the controlled substances, the birth control pills and devices; the junk food still in shopping bags--onion-and-garlic chips, nacho thins, peanut creme patties, Waffelos and Kabooms, fruit chews and toffee popcorn; the Dum-Dum pops, the Mystic mints.",
    latitude: 17.060816,
    longitude: -61.796428,
    title: "White Noise",
    birth_year: 1936,
    code: "DD",
  },
  {
    name: "Charles Dickens",
    first_line:
      "It was the best of times, it was the worst of times,\n    it was the age of wisdom, it was the age of foolishness,\n    it was the epoch of belief, it was the epoch of incredulity,\n    it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair,\n    we had everything before us, we had nothing before us,\n    we were all going direct to Heaven, we were all going direct the other way--in short, the period was so far like the present period that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.",
    latitude: 23.424076,
    longitude: 53.847818,
    title: "A Tale of Two Cities",
    birth_year: 1812,
    code: "AE",
  },
  {
    name: "Emily Dickinson",
    first_line:
      "I’m Nobody! Who are you?\nAre you – Nobody – too?\nThen there’s a pair of us!\nDon't tell! they'd advertise – you know!\nHow dreary – to be – Somebody!\nHow public – like a Frog –\nTo tell one’s name – the livelong June –\nTo an admiring Bog!",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "I’m Nobody! Who are you? (260)",
    birth_year: 1830,
    code: "ED",
  },
  {
    name: "Emily Dickinson",
    first_line:
      "I heard a Fly buzz - when I died -\nThe Stillness in the Room\nWas like the Stillness in the Air -\nBetween the Heaves of Storm -\n\nThe Eyes around - had wrung them dry -\nAnd Breaths were gathering firm\nFor that last Onset - when the King\nBe witnessed - in the Room -",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "I heard a Fly buzz - when I died -",
    birth_year: 1830,
    code: "EDF",
  },
  {
    name: "Emily Dickinson",
    first_line:
      "“Hope” is the thing with feathers -\nThat perches in the soul -\nAnd sings the tune without the words -\nAnd never stops - at all -\n\nAnd sweetest - in the Gale - is heard -\nAnd sore must be the storm -\nThat could abash the little Bird\nThat kept so many warm -",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "“Hope” is the thing with feathers",
    birth_year: 1830,
    code: "EH",
  },
  {
    name: "John Donne",
    first_line:
      "Our two souls therefore, which are one,\n   Though I must go, endure not yet\nA breach, but an expansion,\n   Like gold to airy thinness beat.\nIf they be two, they are two so\n   As stiff twin compasses are two;\nThy soul, the fixed foot, makes no show\n   To move, but doth, if the other do.\n\nAnd though it in the center sit,\n   Yet when the other far doth roam,\nIt leans and hearkens after it,\n   And grows erect, as that comes home.\n\nSuch wilt thou be to me, who must,\n   Like th' other foot, obliquely run;\nThy firmness makes my circle just,\n   And makes me end where I begun.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "A Valediction: Forbidding Mourning",
    birth_year: 1572,
    code: "JD",
  },
  {
    name: "John Donne",
    first_line:
      "Death, be not proud, though some have called thee\nMighty and dreadful, for thou art not so;\nFor those whom thou think'st thou dost overthrow\nDie not, poor Death, nor yet canst thou kill me.\nFrom rest and sleep, which but thy pictures be,\nMuch pleasure; then from thee much more must flow,\nAnd soonest our best men with thee do go,\nRest of their bones, and soul's delivery.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Holy Sonnets: Death, be not proud",
    birth_year: 1572,
    code: "HS",
  },
  {
    name: "Ernest Dowson",
    first_line:
      "They are not long, the weeping and the laughter,\nLove and desire and hate:\nI think they have no portion in us after\nWe pass the gate.\n\nThey are not long, the days of wine and roses:\nOut of a misty dream\nOur path emerges for a while, then closes\nWithin a dream.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Vitae Summa Brevis Spem Nos Vetat Incohare Longam",
    birth_year: 1867,
    code: "WR",
  },
  {
    name: "Paul Laurence Dunbar",
    first_line:
      "We wear the mask that grins and lies,\nIt hides our cheeks and shades our eyes,—\nThis debt we pay to human guile;\nWith torn and bleeding hearts we smile,\nAnd mouth with myriad subtleties.\n\nWhy should the world be over-wise,\nIn counting all our tears and sighs?\nNay, let them only see us, while\n       We wear the mask.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "We Wear the Mask",
    birth_year: 1872,
    code: "PL",
  },
  {
    name: "T.S. Eliot",
    first_line:
      "I grow old ... I grow old ...\nI shall wear the bottoms of my trousers rolled.\nShall I part my hair behind?   Do I dare to eat a peach?\nI shall wear white flannel trousers, and walk upon the beach.\nI have heard the mermaids singing, each to each.\nI do not think that they will sing to me.\nI have seen them riding seaward on the waves\nCombing the white hair of the waves blown back\nWhen the wind blows the water white and black.\nWe have lingered in the chambers of the sea\nBy sea-girls wreathed with seaweed red and brown\nTill human voices wake us, and we drown.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Love Song of J. Alfred Prufrock",
    birth_year: 1888,
    code: "TE",
  },
  {
    name: "T.S. Eliot",
    first_line:
      "April is the cruellest month, breeding\nLilacs out of the dead land, mixing\nMemory and desire, stirring\nDull roots with spring rain.\nWinter kept us warm, covering\nEarth in forgetful snow, feeding\nA little life with dried tubers.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Waste Land",
    birth_year: 1888,
    code: "TS",
  },
  {
    name: "Robert Frost",
    first_line:
      "He gives his harness bells a shake\nTo ask if there is some mistake.\nThe only other sound's the sweep\nOf easy wind and downy flake.\n\nThe woods are lovely, dark and deep.\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Stopping By Woods on a Snowy Evening",
    birth_year: 1874,
    code: "RF",
  },
  {
    name: "Robert Frost",
    first_line:
      "He is all pine and I am apple orchard.\nMy apple trees will never get across\nAnd eat the cones under his pines, I tell him.\nHe only says, ‘Good fences make good neighbors.’\nSpring is the mischief in me, and I wonder\nIf I could put a notion in his head:\n‘Why do they make good neighbors? Isn’t it\nWhere there are cows? But here there are no cows.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Mending Wall",
    birth_year: 1874,
    code: "FR",
  },
  {
    name: "Robert Frost",
    first_line:
      "Yet knowing how way leads on to way,\nI doubted if I should ever come back.\n\nI shall be telling this with a sigh\nSomewhere ages and ages hence:\nTwo roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Road Not Taken",
    birth_year: 1874,
    code: "RN",
  },
  {
    name: "Khalil Gibran",
    first_line:
      "Love one another, but make not a bond\nof love:\n     Let it rather be a moving sea between\nthe shores of your souls.\n     Fill each other’s cup but drink not from\none cup.\n     Give one another of your bread but eat\nnot from the same loaf.\n     Sing and dance together and be joyous,\nbut let each one of you be alone,\n     Even as the strings of a lute are alone\nthough they quiver with the same music.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "On Marriage",
    birth_year: 1883,
    code: "KG",
  },
  {
    name: "Allen Ginsberg",
    first_line:
      "I saw the best minds of my generation destroyed by madness, starving hysterical naked,\ndragging themselves through the negro streets at dawn looking for an angry fix,\nangelheaded hipsters burning for the ancient heavenly connection to the starry dynamo in the machinery of night,\nwho poverty and tatters and hollow-eyed and high sat up smoking in the supernatural darkness of cold-water flats floating across the tops of cities contemplating jazz,\nwho bared their brains to Heaven under the El and saw Mohammedan angels staggering on tenement roofs illuminated,\nwho passed through universities with radiant cool eyes hallucinating Arkansas and Blake-light tragedy among the scholars of war,\nwho were expelled from the academies for crazy & publishing obscene odes on the windows of the skull,",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Howl",
    birth_year: 1927,
    code: "AG",
  },
  {
    name: "Allen Ginsberg",
    first_line:
      "What thoughts I have of you tonight, Walt Whitman, for I walked down the sidestreets under the trees with a headache self-conscious looking at the full moon.\n         In my hungry fatigue, and shopping for images, I went into the neon fruit supermarket, dreaming of your enumerations!\n         What peaches and what penumbras! Whole families shopping at night! Aisles full of husbands! Wives in the avocados, babies in the tomatoes!—and you, Garcia Lorca, what were you doing down by the watermelons?\n\n         I saw you, Walt Whitman, childless, lonely old grubber, poking among the meats in the refrigerator and eyeing the grocery boys.\n         I heard you asking questions of each: Who killed the pork chops? What price bananas? Are you my Angel?\n         I wandered in and out of the brilliant stacks of cans following you, and followed in my imagination by the store detective.\n         We strode down the open corridors together in our solitary fancy tasting artichokes, possessing every frozen delicacy, and never passing the cashier.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "A Supermarket in California",
    birth_year: 1927,
    code: "GA",
  },
  {
    name: "Gerard Manley Hopkins",
    first_line:
      "The world is charged with the grandeur of God.\n    It will flame out, like shining from shook foil;\n    It gathers to a greatness, like the ooze of oil\nCrushed. Why do men then now not reck his rod?\nGenerations have trod, have trod, have trod;\n    And all is seared with trade; bleared, smeared with toil;\n    And wears man's smudge and shares man's smell: the soil\nIs bare now, nor can foot feel, being shod.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "God's Grandeur",
    birth_year: 1844,
    code: "MH",
  },
  {
    name: "Langston Hughes",
    first_line:
      "What happens to a dream deferred?\n\n      Does it dry up\n      like a raisin in the sun?\n      Or fester like a sore—\n      And then run?\n      Does it stink like rotten meat?\n      Or crust and sugar over—\n      like a syrupy sweet?\n\n      Maybe it just sags\n      like a heavy load.\n\n      Or does it explode?",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Harlem",
    birth_year: 1902,
    code: "LH",
  },
  {
    name: "Langston Hughes",
    first_line:
      "Thump, thump, thump, went his foot on the floor.\nHe played a few chords then he sang some more—\n“I got the Weary Blues\nAnd I can’t be satisfied.\nGot the Weary Blues\nAnd can’t be satisfied—\nI ain’t happy no mo’\nAnd I wish that I had died.”\nAnd far into the night he crooned that tune.\nThe stars went out and so did the moon.\nThe singer stopped playing and went to bed\nWhile the Weary Blues echoed through his head.\nHe slept like a rock or a man that’s dead.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Weary Blues",
    birth_year: 1902,
    code: "HL",
  },
  {
    name: "Ben Jonson",
    first_line:
      "I therefore will begin. Soul of the age!\nThe applause, delight, the wonder of our stage!\nMy Shakespeare, rise! I will not lodge thee by\nChaucer, or Spenser, or bid Beaumont lie\nA little further, to make thee a room:\nThou art a monument without a tomb,\nAnd art alive still while thy book doth live\nAnd we have wits to read and praise to give.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "To the Memory of My Beloved the Author, Mr. William Shakespeare",
    birth_year: 1572,
    code: "BJ",
  },
  {
    name: "John Keats",
    first_line:
      "Thou, silent form, dost tease us out of thought\nAs doth eternity: Cold Pastoral!\n         When old age shall this generation waste,\n                Thou shalt remain, in midst of other woe\nThan ours, a friend to man, to whom thou say'st,\n         \"Beauty is truth, truth beauty,—that is all\n                Ye know on earth, and all ye need to know.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Ode on a Grecian Urn",
    birth_year: 1795,
    code: "JK",
  },
  {
    name: "Henry Wadsworth Longfellow",
    first_line:
      "By the shore of Gitche Gumee,\nBy the shining Big-Sea-Water,\nAt the doorway of his wigwam,\nIn the pleasant Summer morning,\nHiawatha stood and waited.\nAll the air was full of freshness,\nAll the earth was bright and joyous,\nAnd before him, through the sunshine,\nWestward toward the neighboring forest\nPassed in golden swarms the Ahmo,\nPassed the bees, the honey-makers,\nBurning, singing in the sunshine.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Song of Hiawatha",
    birth_year: 1807,
    code: "HL",
  },
  {
    name: "Andrew Marvell",
    first_line:
      "Had we but world enough and time,\nThis coyness, lady, were no crime.\nWe would sit down, and think which way\nTo walk, and pass our long love’s day.\nThou by the Indian Ganges’ side\nShouldst rubies find; I by the tide\nOf Humber would complain. I would\nLove you ten years before the flood,\nAnd you should, if you please, refuse",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "To His Coy Mistress",
    birth_year: 1621,
    code: "AM",
  },
  {
    name: "Claude McKay",
    first_line:
      "If we must die, let it not be like hogs\nHunted and penned in an inglorious spot,\nWhile round us bark the mad and hungry dogs,\nMaking their mock at our accursèd lot.\nIf we must die, O let us nobly die,\nSo that our precious blood may not be shed\nIn vain; then even the monsters we defy\nShall be constrained to honor us though dead!",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "If We Must Die",
    birth_year: 1889,
    code: "CM",
  },
  {
    name: "Edna St. Vincent Millay",
    first_line:
      "What lips my lips have kissed, and where, and why,\nI have forgotten, and what arms have lain\nUnder my head till morning; but the rain\nIs full of ghosts tonight, that tap and sigh\nUpon the glass and listen for reply,\nAnd in my heart there stirs a quiet pain\nFor unremembered lads that not again\nWill turn to me at midnight with a cry.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "What lips my lips have kissed, and where, and why",
    birth_year: 1892,
    code: "EM",
  },
  {
    name: "John Milton",
    first_line:
      "This is the month, and this the happy morn,\n      Wherein the Son of Heav'n's eternal King,\nOf wedded Maid, and Virgin Mother born,\n      Our great redemption from above did bring;\n      For so the holy sages once did sing,\n            That he our deadly forfeit should release,\n            And with his Father work us a perpetual peace.",
    latitude: 17.060816,
    longitude: -61.796428,
    title: "On the Morning of Christ's Nativity",
    birth_year: 1608,
    code: "JM",
  },
  {
    name: "John Milton",
    first_line:
      "OF Mans First Disobedience, and the Fruit\nOf that Forbidden Tree, whose mortal tast\nBrought Death into the World, and all our woe,\nWith loss of Eden, till one greater Man\nRestore us, and regain the blissful Seat,\nSing Heav'nly Muse, that on the secret top\nOf Oreb, or of Sinai, didst inspire\nThat Shepherd, who first taught the chosen Seed,",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Paradise Lost: Book 1",
    birth_year: 1608,
    code: "JMD",
  },
  {
    name: "Toni Morrison",
    first_line:
      "“Your love is too thick,” he said, thinking,\n    That bitch is looking at me; she is right over my head looking down through the floor at me.\n    “Too thick?”she said, thinking of the Clearing where Baby Suggs’ commands knocked the pods off horse chestnuts.\n    “Love is or it ain’t. Thin love ain’t love at all.”\n    “Yeah. It didn’t work, did it? Did it work?” he asked.\n“It worked,” she said.",
    latitude: 17.060816,
    longitude: -61.796428,
    title: "Beloved",
    birth_year: 1931,
    code: "AG",
  },
  {
    name: "Sylvia Plath",
    first_line:
      "A cake of soap,\nA wedding ring,\nA gold filling.\nHerr God, Herr Lucifer\nBeware\nBeware.\nOut of the ash\nI rise with my red hair\nAnd I eat men like air.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Lady Lazarus",
    birth_year: 1932,
    code: "SP",
  },
  {
    name: "Sylvia Plath",
    first_line:
      "Daddy, I have had to kill you.   \nYou died before I had time——\nMarble-heavy, a bag full of God,   \nGhastly statue with one gray toe   \nBig as a Frisco seal\n\nAnd a head in the freakish Atlantic   \nWhere it pours bean green over blue   \nIn the waters off beautiful Nauset.   \nI used to pray to recover you.\nAch, du.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Daddy",
    birth_year: 1932,
    code: "PS",
  },
  {
    name: "Edgar Allen Poe",
    first_line:
      "It was many and many a year ago,\n   In a kingdom by the sea,\nThat a maiden there lived whom you may know\n   By the name of Annabel Lee;\nAnd this maiden she lived with no other thought\n   Than to love and be loved by me.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Annabel Lee",
    birth_year: 1809,
    code: "AP",
  },
  {
    name: "Edgar Allen Poe",
    first_line:
      "Once upon a midnight dreary, while I pondered, weak and weary,\nOver many a quaint and curious volume of forgotten lore—\n    While I nodded, nearly napping, suddenly there came a tapping,\nAs of some one gently rapping, rapping at my chamber door.\n“’Tis some visitor,” I muttered, “tapping at my chamber door—\n            Only this and nothing more.”",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Raven",
    birth_year: 1809,
    code: "EP",
  },
  {
    name: "Alexander Pope",
    first_line:
      "Hope springs eternal in the human breast:\nMan never is, but always to be blest:\nThe soul, uneasy and confin'd from home,\nRests and expatiates in a life to come.\nLo! the poor Indian, whose untutor'd mind\nSees God in clouds, or hears him in the wind;\nHis soul, proud science never taught to stray\nFar as the solar walk, or milky way;",
    latitude: 17.060816,
    longitude: -61.796428,
    title: "An Essay on Man: Epistle I",
    birth_year: 1688,
    code: "APH",
  },
  {
    name: "Ezra Pound",
    first_line:
      "In a Station of the Metro \nThe apparition of these faces in the crowd:\nPetals on a wet, black bough.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "In a Station of the Metro",
    birth_year: 1885,
    code: "EP",
  },
  {
    name: "Christina Rossetti",
    first_line:
      "Morning and evening\nMaids heard the goblins cry:\n“Come buy our orchard fruits,\nCome buy, come buy:\nApples and quinces,\nLemons and oranges,\nPlump unpeck’d cherries,\nMelons and raspberries,",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Goblin Market",
    birth_year: 1830,
    code: "CR",
  },
  {
    name: "William Shakespeare",
    first_line:
      "How like a winter hath my absence been\nFrom thee, the pleasure of the fleeting year!\nWhat freezings have I felt, what dark days seen!\nWhat old December's bareness everywhere!\nAnd yet this time remov'd was summer's time,\nThe teeming autumn, big with rich increase,\nBearing the wanton burthen of the prime,\nLike widow'd wombs after their lords' decease:\nYet this abundant issue seem'd to me\nBut hope of orphans and unfather'd fruit;\nFor summer and his pleasures wait on thee,\nAnd thou away, the very birds are mute;\nOr if they sing, 'tis with so dull a cheer\nThat leaves look pale, dreading the winter's near.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Sonnet 97: How like a winter hath my absence been",
    birth_year: 1564,
    code: "WS",
  },
  {
    name: "William Shakespeare",
    first_line:
      "Shall I compare thee to a summer’s day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer’s lease hath all too short a date;\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm'd;\nAnd every fair from fair sometime declines,\nBy chance or nature’s changing course untrimm'd;",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Shall I compare thee to a summer’s day?",
    birth_year: 1564,
    code: "SS",
  },
  {
    name: "Tupac Shakur",
    first_line:
      "Did you hear about the rose that grew\nfrom a crack in the concrete?\nProving nature's law is wrong it\nlearned to walk with out having feet.\nFunny it seems, but by keeping its dreams,\nit learned to breathe fresh air.\nLong live the rose that grew from concrete\nwhen no one else ever cared.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Rose That Grew from Concrete",
    birth_year: 1971,
    code: "ST",
  },
  {
    name: "Shel Silverstein",
    first_line:
      "I tripped on my shoelace\nAnd I fell up—\nUp to the roof tops,\nUp over town,\nUp past the tree tops,\nUp over the mountains,\nUp where the colors\nBlend into the sounds.\nBut it got me so dizzy\nWhen I looked around,\n\nI got sick to my stomach\n\nAnd I threw down.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Falling Up",
    birth_year: 1930,
    code: "SSS",
  },
  {
    name: "Percy Shelley",
    first_line:
      "I met a traveller from an antique land,\nWho said—“Two vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;\nAnd on the pedestal, these words appear:\nMy name is Ozymandias, King of Kings;\nLook on my Works, ye Mighty, and despair!",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Ozymandias",
    birth_year: 1792,
    code: "PS",
  },
  {
    name: "Gertrude Stein",
    first_line:
      "Color mahogany.\nColor mahogany center.\nRose is a rose is a rose is a rose.\nLoveliness extreme.\nExtra gaiters.\nLoveliness extreme.\nSweetest ice-cream.\nPage ages page ages page ages.\nWiped Wiped wire wire.\nSweeter than peaches and pears and cream.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Sacred Emily",
    birth_year: 1874,
    code: "GS",
  },
  {
    name: "Wallace Stevens",
    first_line:
      "I placed a jar in Tennessee,   \nAnd round it was, upon a hill.   \nIt made the slovenly wilderness   \nSurround that hill.\n\nThe wilderness rose up to it,\nAnd sprawled around, no longer wild.   \nThe jar was round upon the ground   \nAnd tall and of a port in air.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Anecdote of the Jar",
    birth_year: 1879,
    code: "WSJ",
  },
  {
    name: "Samuel Taylor Coleridge",
    first_line:
      "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\n   Down to a sunless sea.\nSo twice five miles of fertile ground\nWith walls and towers were girdled round;\nAnd there were gardens bright with sinuous rills,\nWhere blossomed many an incense-bearing tree;",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Kubla Khan",
    birth_year: 1772,
    code: "SC",
  },
  {
    name: "Alfred Lord Tennyson",
    first_line:
      "The heart that never plighted troth\n      But stagnates in the weeds of sloth,\nNor any want-begotten rest.\nI hold it true, whate’er befall,\n      I feel it, when I sorrow most;\n      ‘Tis better to have loved and lost\nThan never to have loved at all.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "In Memoriam A.H.H. 1849",
    birth_year: 1809,
    code: "AT",
  },
  {
    name: "Alfred Lord Tennyson",
    first_line:
      "It little profits that an idle king,\nBy this still hearth, among these barren crags,\nMatch'd with an aged wife, I mete and dole\nUnequal laws unto a savage race,\nThat hoard, and sleep, and feed, and know not me.\nI cannot rest from travel: I will drink\nLife to the lees: All times I have enjoy'd\nGreatly, have suffer'd greatly, both with those\nThat loved me, and alone, on shore, and when\nThro' scudding drifts the rainy Hyades",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Ulysses",
    birth_year: 1809,
    code: "ATP",
  },
  {
    name: "Walt Whitman",
    first_line:
      "I celebrate myself, and sing myself,\nAnd what I assume you shall assume,\nFor every atom belonging to me as good belongs to you.\n\nI loafe and invite my soul,\nI lean and loafe at my ease observing a spear of summer grass.\n\nMy tongue, every atom of my blood, form’d from this soil, this air,\nBorn here of parents born here from parents the same, and their parents the same,\nI, now thirty-seven years old in perfect health begin,\nHoping to cease not till death.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Song of Myself",
    birth_year: 1819,
    code: "WA",
  },
  {
    name: "Walt Whitman",
    first_line:
      "O Captain! my Captain! our fearful trip is done,\nThe ship has weather’d every rack, the prize we sought is won,\nThe port is near, the bells I hear, the people all exulting,\nWhile follow eyes the steady keel, the vessel grim and daring;\n                         But O heart! heart! heart!\n                            O the bleeding drops of red,\n                               Where on the deck my Captain lies,\n                                  Fallen cold and dead.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "O Captain! My Captain!",
    birth_year: 1819,
    code: "OC",
  },
  {
    name: "William Carlos Williams",
    first_line:
      "so much depends\nupon\n\na red wheel\nbarrow\n\nglazed with rain\nwater\n\nbeside the white\nchickens",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Red Wheelbarrow",
    birth_year: 1883,
    code: "CW",
  },
  {
    name: "William Carlos Williams",
    first_line:
      "I have eaten\nthe plums\nthat were in\nthe icebox\n\nand which\nyou were probably\nsaving\nfor breakfast",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "This Is Just To Say",
    birth_year: 1883,
    code: "WC",
  },
  {
    name: "William Wordsworth",
    first_line:
      "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "I wandered Lonely as a Cloud",
    birth_year: 1770,
    code: "WW",
  },
  {
    name: "William Butler Yeats",
    first_line:
      "Turning and turning in the widening gyre\nThe falcon cannot hear the falconer;\nThings fall apart; the centre cannot hold;\nMere anarchy is loosed upon the world,\nThe blood-dimmed tide is loosed, and everywhere\nThe ceremony of innocence is drowned;\nThe best lack all conviction, while the worst\nAre full of passionate intensity.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "The Second Coming",
    birth_year: 1865,
    code: "WY",
  },
  {
    name: "William Butler Yeats",
    first_line:
      "That is no country for old men. The young\nIn one another's arms, birds in the trees,\n—Those dying generations—at their song,\nThe salmon-falls, the mackerel-crowded seas,\nFish, flesh, or fowl, commend all summer long\nWhatever is begotten, born, and dies.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Sailing to Byzantium",
    birth_year: 1865,
    code: "WYC",
  },
  {
    name: "William Butler Yeats",
    first_line:
      "MacDonagh and MacBride   \nAnd Connolly and Pearse\nNow and in time to be,\nWherever green is worn,\nAre changed, changed utterly:   \nA terrible beauty is born.",
    latitude: 42.546245,
    longitude: 1.601554,
    title: "Easter, 1916",
    birth_year: 1865,
    code: "TB",
  },
];

export const fictionalCountries: Country[] = [];

export function getCountryName(language: string, country: Country | undefined) {
  return country?.name;
}

export function sanitizeCountryName(countryName: string | undefined): string {
  return countryName
    ? countryName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[- '()]/g, "")
        .toLowerCase()
    : "";
}

export interface Iso {
  [id: string]: string;
}

export const countryISOMapping: Iso = {
  AF: "AFG",
  AE: "AFG",
  AX: "ALA",
  AL: "ALB",
  DZ: "DZA",
  AS: "ASM",
  AD: "AND",
  AO: "AGO",
  AI: "AIA",
  AQ: "ATA",
  AG: "ATG",
  AR: "ARG",
  AM: "ARM",
  AW: "ABW",
  DD: "DDW",
};

export function getCountryPrettyName(
  str: string | undefined,
  isAprilFools = false
): string {
  const items = isAprilFools ? fictionalCountries : countries;
  if (str) {
    const country = items.find(
      (c) => sanitizeCountryName(c.name.toLowerCase()) === str
    );
    if (country) {
      return isAprilFools
        ? `${country.name}`
        : /*  : flag(country?.code)
        ? `${flag(country?.code)} ${country.name}`*/
          `${country.name}`;
    }
  }
  return `${str}`;
}

export function getCountryByName(countryName: string): Country | undefined {
  return countries.find(
    (country) =>
      sanitizeCountryName(getCountryName(i18n.resolvedLanguage, country)) ===
      sanitizeCountryName(countryName)
  );
}

export function getBirthYearByName(countryName: string): Country | undefined {
  return countries.find(
    (country) =>
      sanitizeCountryName(getCountryName(i18n.resolvedLanguage, country)) ===
      sanitizeCountryName(countryName)
  );
}

export function getFictionalCountryByName(
  countryName: string
): Country | undefined {
  return fictionalCountries.find(
    (country) =>
      sanitizeCountryName(getCountryName(i18n.resolvedLanguage, country)) ===
      sanitizeCountryName(countryName)
  );
}
