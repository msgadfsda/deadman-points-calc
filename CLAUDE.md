# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` - Start development server at http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm test -- --watchAll=false` - Run tests once without watch mode
- `npm test -- --testPathPattern="App.test"` - Run a specific test file
- `npm run build` - Build for production

## Architecture

This is a DMM (Deadman Mode) Points Calculator for Old School RuneScape, built with Create React App and TypeScript.

- **src/App.tsx** - Main application containing:
  - `SKILLS` array with all 23 OSRS skills and wiki icon URLs
  - `calculateDMMPoints()` - Points calculation logic
  - Skill grid UI with level inputs

## DMM Points Formula

- 5 points for every skill level above 1
- Extra 5 points for every skill level past 50
- 300 bonus points for level 99

## TypeScript

- Strict mode is enabled
- Component files use `.tsx` extension
