import { Component, OnInit } from "@angular/core";
import { QuizService } from "../quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { quiz, QuizResolved } from "../models";
import { ConfirmationService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
  providers: [ConfirmationService, DialogService],
})
export class QuizComponent implements OnInit {
  quizQueries: quiz[];
  val1: string;
  questionNo: number = 0;
  score: number = 0;
  submitConfirm: boolean;
  confirmationContent: string;
  ref: DynamicDialogRef;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) {
    this.route.data.subscribe((data: QuizResolved) => {
      this.quizQueries = data["quizQueries"].Quiz;
    });
  }

  ngOnInit() {}

  prevQuestion() {
    this.questionNo = this.questionNo - 1 < 0 ? 0 : this.questionNo - 1;
  }

  nextQuestion() {
    this.questionNo =
      this.questionNo + 1 > this.quizQueries.length - 1
        ? this.questionNo
        : this.questionNo + 1;

    this.quizQueries[this.questionNo].selectedAnswer;
  }

  submitQuiz() {
    // Calculate unanswered questions count
    let unAnsweredCnt = this.quizQueries.length;
    this.quizQueries.forEach((quiz) => {
      quiz.selectedAnswer ? unAnsweredCnt-- : unAnsweredCnt;
    });

    // Dialog confirmation Prompt on Submit
    this.submitConfirm = true;
    this.confirmationContent =
      unAnsweredCnt === 0
        ? "Are you sure to submit your Quiz ?"
        : `Hey! you have ${unAnsweredCnt} unanswered ${
            unAnsweredCnt === 1 ? "question" : "questions"
          }. Are you sure to Submit ?`;
  }

  onYes() {
    sessionStorage.setItem("quizResults", JSON.stringify(this.quizQueries));
    this.router.navigate(["/results"]);
  }
}
