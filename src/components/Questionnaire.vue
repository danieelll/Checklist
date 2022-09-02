<template>
    <div id="app" class="quiz-bg mx-auto pt-5 m-0">
        <div class="container header-text">
            <h1 class="text-center mb-2 text-light">Unlock Your Sacred Archetypal Powers & Experience Abundance Across All Aspects Of Your Life.</h1>
        </div>
        <div class="container quiz-img p-0 mt-5 mb-5">
            <img src="../assets/img/icon-img/quiz-brain-gear.png">
        </div>

        <!-- beginner -->
        <div id="begin" class="text-center" v-show="showQuiz === false">
            <p class="begin-text">Knowing ones self is a key for acheiving greater success.</p>
            <button class="btn button-begin glow-on-hover text-center" @click="showQuiz = !showQuiz" >
            BEGIN
            <img class="img=fluid" src="../assets/img/icon-img/quiz-play-icon.png"/>
            </button>
        </div>

        <transition name="fade">
            <div class="container quiz-card mb-5" v-show="showQuiz === true">
                <div class="jumbotron mt-3">
                    <p v-show="questionIndex !== quiz.questions.length" class="h3 text-center weight-bold c-violet">Question {{ questionEnd + 1 }} of 21</p>
                    <!-- Alert -->
                    <p v-if="errors[questionBatch]" class="alert alert-danger">
                        {{ error }}
                    </p>

                    <div v-for="(question, index) in quiz.questions" :key="question">

                        <div v-show="showQuestion(index)">
                            
                            <hr class="bg-danger border-2 border-top border-danger">
                            <div class="row">
                                <div class="col-12 order-md-1">
                                    <h4 class="mb-4 text-center text-md-start">{{ question.text }}</h4> 
                                </div>
                            
                                <!-- question image -->
                                <div class="col-sx-12 col-md-4 order-md-3">
                                    <div class="question-img">
                                        <img :src="require(`@/assets/img/quiz-img/${question.image}.png`)" alt class="img-fluid rounded-circle  mx-auto"/>
                                    </div>
                                </div>

                                <div class="col order-md-2">
                                    <div v-for="answer in question.answers" class="form-check mb-sm-3" :key="answer">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="radio"
                                                :value="answer.value"
                                                :name="index"
                                                v-model="responses[index]">
                                            {{answer.text}}
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Prev and Next buttons -->
                    <div v-show="questionIndex !== quiz.questions.length" class="row justify-content-between mt-5">
                        <button class="btn col shade-prev" v-if="questionIndex > 0" @click="prev">
                            Previous
                        </button>
                        <button class="btn col shade-next" @click="next">
                            Next
                            <!--<img class="img-fluid btn-next-img" src="../assets/img/icon-img/quiz-right-arrow.png"/>-->
                        </button>  
                    </div>
                

                    <!-- Ending -->
                    <transition name="question">
                    <div v-show="questionIndex === quiz.questions.length" class="row justify-content-center">
                            <div class="col mx-auto text-center">
                            <h3 class="">See Your Traits</h3>
                            <!--<p>
                                You are: {{ score() }}
                            </p>-->
                            
                            <button class="btn btn-next d-black my-4" @click="redirect">
                                Reveal
                            </button>
                        </div>
                    </div>
                    </transition>
                </div>
            </div>
        </transition>
        

        <div id="footer" class="" :class="{'footer-relative': showQuiz ,'footer-fixed': !showQuiz}">
            <div class="footer-logo">
                <img class="img-fluid" src="../assets/img/icon-img/quiz-wealth_avatarr.png">
            </div>
            <p class="small text-center" style="font-family:'Raleway',sans-serif;">&copy; Copyright 2022 wealthavatarr.com, All Rights Reserved</p>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios';
    // import Swal from 'sweetalert2';

    export default {
        props:
        {
            msg: String
        },
        data () {
            return {
                showQuiz: false,
                quiz: {
                        title: "Quiz",
                        questions: [
                            { // Question 1
                                text: 'You get anxious about losing a dollar in your bank account.',
                                image: 'q1-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value:  ["CO","GI","IN"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","SA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["BA"]
                                    },
                                ]
                            },
                            { // Question 2
                                text: 'You judge people based on how they handle their funds and budget.',
                                image: 'q2-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","CO","GI"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["IN"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["BA"]
                                    },
                                ]
                            },
                            { // Question 3
                                text: 'You’d rather keep your money in a bank, rather than putting them in any other investment for fear of losing it.',
                                image: 'q3-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","CO","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["BA"]
                                    },
                                ]
                            },
                            { // Question 4
                                text: 'You easily turn your creative ideas into a business proposal.',
                                image: 'q4-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "SA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CA"]
                                    },
                                ]
                            },
                            { // Question 5
                                text: 'You’d rather work than spend a whole day resting.',
                                image: 'q5-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "BA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CA"]
                                    },
                                ]
                            },
                            { // Question 6
                                text: 'Your family members see you as the most workaholic person they ever know.',
                                image: 'q6-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN","AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "BA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CA"]
                                    },
                                ]
                            },
                            { // Question 7
                                text: 'You love hanging out with people, old and new acquaintances.',
                                image: 'q7-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["CA","BA"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["GI","CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD", "IN"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["SA"]
                                    },
                                ]
                            },
                            { // Question 8
                                text: 'You credit certain people for your success.',
                                image: 'q8-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["CA","IN"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["BA","CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI", "AD"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["SA"]
                                    },
                                ]
                            },
                            { // Question 9
                                text: 'Your connection with other people is vital to your success.',
                                image: 'q9-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA","IN", "CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI", "AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["SA"]
                                    },
                                ]
                            },
                            { // Question 10
                                text: 'You love taking financial risks.',
                                image: 'q10-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA","SA","GI","AD"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CO"]
                                    },
                                ]
                            },
                            { // Question 11
                                text: 'You’d rather see your investment in big assets in hopes of generating income in the future than opt for small assets for a meager passive income.',
                                image: 'q11-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA","GI","AD"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["SA","IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CA"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CO"]
                                    },
                                ]
                            },
                            { // Question 12
                                text: 'You find it hard to trust people (not just with your money, but also with your ideas and responsibilities)',
                                image: 'q12-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["SA","GI","AD","BA"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CA"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["CO"]
                                    },
                                ]
                            },
                            { // Question 13
                                text: 'You find it hard to say NO to people who ask for a favor.',
                                image: 'q13-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA", "IN", "AD"],
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["GI"]
                                    },
                                ]
                            },
                            { // Question 14
                                text: 'You feel like you owe people big time.',
                                image: 'q14-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "CO"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["IN"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA", "AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["GI"]
                                    },
                                ]
                            },
                            { // Question 15
                                text: 'You love spoiling people.',
                                image: 'q15-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "CO"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA", "IN"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["GI"]
                                    },
                                ]
                            },
                            { // Question 16
                                text: 'You love flaunting your expensive stuff in real life and/or in social media.',
                                image: 'q16-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "SA", "AD"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA", "CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["IN"]
                                    },
                                ]
                            },
                            { // Question 17
                                text: 'You’d rather save money to buy material things that you think you deserve.',
                                image: 'q17-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "SA", "CO", "GI"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["AD"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["IN"]
                                    },
                                ]
                            },
                            { // Question 18
                                text: 'You believe that money (and what you do about it) is one of the most effective means to get recognized.',
                                image: 'q18-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "SA", "AD", "GI"],
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["IN"]
                                    },
                                ]
                            },
                            { // Question 19
                                text: 'You see yourself leading a social movement.',
                                image: 'q19-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "IN"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["CO"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["GI", "SA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["AD"]
                                    },
                                ]
                            },
                            { // Question 20
                                text: 'Money will never make you happy, but relationships will.',
                                image: 'q20-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "IN"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["SA"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["CO", "GI"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["AD"]
                                    },
                                ]
                            },
                            { // Question 21
                                text: 'You care so much about social injustice.',
                                image: 'q21-500',
                                answers: [
                                    {
                                        text: 'Least Likely',
                                        value: ["BA", "CA", "CO", "IN"]
                                    },
                                    {
                                        text: 'Moderate Likely',
                                        value: ["GI"]
                                    },
                                    {
                                        text: 'Likely',
                                        value: ["SA"]
                                    },
                                    {
                                        text: 'Highly Likely',
                                        value: ["AD"]
                                    },
                                ]
                            },
                        ]
                    },
                questionIndex: 0,
                responses: [],
                errors: [],
                error: '',
                categoriesPoints: {
                    banker: 0,
                    capitalist: 0,
                    salesPerson: 0,
                    conqueror: 0,
                    giver: 0,
                    influencer: 0,
                    adversary: 0
                },
                avatar: '',
                questionStart: 0,
                questionEnd: 2,
                questionBatch: 1,
            }
        },
        created() {
            document.title = "Wealth Avatarr";
        },

        methods: {
            prev: function() {
                this.questionIndex -= 3;
                this.questionStart -= 3;
                this.questionEnd -= 3;
            },
        
            next: function() {

                var end = this.questionEnd
                for(let i=this.questionStart; i <= end; i++)
                {
                    if (this.responses[i] === undefined) {
                        this.errors[this.questionBatch] = 1;
                        this.error = 'Please select your answer';
                        return;
                    } 
                    else {
                        this.errors[this.questionBatch] = 0;
                        this.error = '';

                        if(i == end )
                        {
                            this.questionIndex  += 3;
                            this.questionStart += 3;
                            this.questionEnd += 3;
                            
                            // console.log(this.questionIndex);
                            // console.log(this.questionStart);
                            // console.log(this.questionEnd);
                        }

                        if(this.questionIndex === this.quiz.questions.length){
                            this.tallyScore();
                        }
                            console.log(i);
                    } 
                }
            },
        
            score: function() {
                
            },
        
            playAgain: function() {
                this.questionIndex = 0;
            },

            tallyScore: function() {
                var categories = this.categoriesPoints;
                let sortable = [];
                var highestCategory;
                this.responses.forEach(function(response){
                    response.forEach(function(item){
                        if(item == "BA"){
                            categories.banker += 1;
                        }
                        else if(item == "CA"){
                            categories.capitalist += 1;
                        }
                        else if(item == "SA")
                        {
                            categories.salesPerson += 1;
                        }
                        else if(item == "CO"){
                            categories.conqueror += 1;
                        }
                        else if(item == "GI"){
                            categories.giver += 1;
                        }
                        else if(item == "IN"){
                            categories.influencer += 1;
                        }
                        else if(item == "AD"){
                            categories.adversary += 1;
                        }
                    });
                });

                for (var items in categories) {
                    sortable.push([items, categories[items]]);
                }

                sortable.sort(function(a, b) {
                    return a[1] - b[1];
                });

                highestCategory = sortable[6][0];

                if(highestCategory == 'banker')
                    this.avatar = 'Banker';
                else if(highestCategory == 'capitalist')
                    this.avatar = 'Capitalist';
                else if(highestCategory == 'salesPerson')
                    this.avatar = 'Sales Person';
                else if(highestCategory == 'conqueror')
                    this.avatar = 'Conqueror';
                else if(highestCategory == 'giver')
                    this.avatar = 'Giver';
                else if(highestCategory == 'influencer')
                    this.avatar = 'Influencer';
                else if(highestCategory == 'adversary')
                    this.avatar = 'Adversary';

                // console.log(this.avatar);
                console.log(categories.banker)
                console.log(categories.capitalist)
                console.log(categories.salesPerson)
                console.log(categories.conqueror)
                console.log(categories.giver)
                console.log(categories.influencer)
                console.log(categories.adversary)
            },

            redirect: function() {
                window.location.href = "https://wealthavatarr.com/redirect?avatar=" + this.avatar ;
            },

            showQuestion: function(value) {
                // this.showing = false;
                if(value >= this.questionStart && value <= this.questionEnd)
                    return true;
                else
                    return false;
            }
        }
    }
    
</script>