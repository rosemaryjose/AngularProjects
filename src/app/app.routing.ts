import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BrickBallComponent } from './brick-ball/brick-ball.component';


const routes:Routes = [
	{path: '', redirectTo: 'brick', pathMatch: 'full'},
	{path: 'brick', component: BrickBallComponent},
	{path: '**', component: BrickBallComponent} 
];
export const routing = RouterModule.forRoot(routes, { useHash: true });
