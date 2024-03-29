import { Component, OnInit, Input } from "@angular/core";
import { quiz, QuizResolved } from "../models";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  finalScore: number = 0;
  quizAnsweredQueries: quiz[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.quizAnsweredQueries = JSON.parse(
      sessionStorage.getItem("quizResults")
    );
    this.quizAnsweredQueries.forEach((quiz) => {
      if (quiz.selectedAnswer) {
        quiz.selectedAnswer.toString().toLowerCase() ===
        quiz.answer.toString().toLowerCase()
          ? this.finalScore++
          : this.finalScore;
      }
    });
  }
  view() {
    this.router.navigate(["/detailed-result"]);
  }

  ngOnInit() {}
  // ngOnDestroy(): void {
  //   sessionStorage.removeItem("quizResults");
  // }
}
